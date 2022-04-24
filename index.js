const express = require('express');
const cors = require('cors');
const fs = require("fs");
const request = require('request');
const jsonplus = require('jsonplus');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = 7799;
const dataJson = jsonplus.parse(fs.readFileSync('./data/data.json', 'utf8'));
const dataMapJson = jsonplus.parse(fs.readFileSync('./data/dataMap.json', 'utf8'))['data'];
const searchMapJson = jsonplus.parse(fs.readFileSync('./data/searchMap.json', 'utf8'))['data'];
const reCaptchaKey = jsonplus.parse(fs.readFileSync('./config.json', 'utf8'))['reCaptchaKey'];
const getIP = (req) => {
    return req.headers['x-forwarded-for'].split(', ')[0];
    // return '127.0.0.1';
};

// checkReq
var reqList = {};
const checkReq = (req, res) => {
    var ip = getIP(req);
    /*
    {
        "ip": {
            "reCaptcha": false,
            "firstReqTime": 123,
            "reqNum": 1,
            "whiteStartTime": 123
        }
    }
    */
    if (reqList != {}) {
        for (i in reqList) {
            if ((process.uptime() - reqList[i]['firstReqTime']) > 10 && reqList[i]['reCaptcha'] == false) {
                delete reqList[i];
            };
        };
    };
    if (reqList[ip] == undefined) {
        // 首次请求
        reqList[ip] = {
            "reCaptcha": false,
            "firstReqTime": process.uptime(),
            "reqNum": 1
        };
    } else if (reqList[ip]['whiteStartTime'] != undefined) {
        // 白名单
        // 白名单限时30min
        if (process.uptime() - reqList[ip]['whiteStartTime'] > (30 * 60)) {
            reqList[ip] = {
                "reCaptcha": false,
                "firstReqTime": process.uptime(),
                "reqNum": 1
            };
            return;
        };
        // 白名单限制 20req/min
        if (process.uptime() - reqList[ip]['firstReqTime'] > 60) {
            reqList[ip]['firstReqTime'] = process.uptime();
            reqList[ip]['reqNum'] = 1;
        } else {
            reqList[ip]['reqNum']++;
            if (reqList[ip]['reqNum'] > 20) {
                reqList[ip]['reCaptcha'] = true;
            };
        };
    } else if ((process.uptime() - reqList[ip]['firstReqTime']) > 60 && reqList[ip]['reCaptcha'] == false) {
        // 距离首次请求超过60s，刷新数据
        reqList[ip] = {
            "reCaptcha": false,
            "firstReqTime": process.uptime(),
            "reqNum": 1
        };
    } else {
        // 非首次请求
        reqList[ip]['reqNum']++;
        // 限制 10req/min
        if (reqList[ip]['reqNum'] > 10) {
            reqList[ip]['reCaptcha'] = true;
        };
    };
    if (reqList[ip]['reCaptcha'] == true) {
        // 需要验证码
        fs.readFile('./assets/html/reCaptcha.html', 'binary', (err, file) => {
            if (err) {
                res.writeHead(404, 'not found');
                res.end('<h1>404 NOT FOUND</h1>');
            } else {
                res.write(file, "binary");
                res.end();
            };
        });
    };
    return reqList[ip]['reCaptcha'];
};

// WEB
const getDark = (cookie) => {
    var tmp = {};
    try {
        cookie = cookie.split('; ');
        for (i in cookie) {
            tmp[cookie[i].split('=')[0]] = cookie[i].split('=')[1];
        };
        if (tmp['dark'] == undefined || tmp['dark'] == '' || tmp['dark'] == 'false' || tmp['dark'] == false) {
            return false;
        } else {
            return true;
        };
    } catch (e) {
        return false;
    };
};
const getIndexHTML = (req, res) => {
    var htmlPath = getDark(req.headers.cookie) ? './assets/html/index-dark.html' : './assets/html/index.html';
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    checkReq(req, res);
    fs.readFile(htmlPath, "binary", (err, file) => {
        if (err) {
            res.writeHead(404, "not found");
            res.end("<h1>404 NOT FOUND</h1>");
        } else {
            res.write(file, "binary");
            res.end();
        };
    });
}
app.get(/\/(回形针PaperClip|基本操作|干燥工厂|原创专辑|混乱博物馆|灵光灯泡|黑水报告|演讲|其他|%E5%9B%9E%E5%BD%A2%E9%92%88PaperClip|%E5%9F%BA%E6%9C%AC%E6%93%8D%E4%BD%9C|%E5%B9%B2%E7%87%A5%E5%B7%A5%E5%8E%82|%E5%8E%9F%E5%88%9B%E4%B8%93%E8%BE%91|%E6%B7%B7%E4%B9%B1%E5%8D%9A%E7%89%A9%E9%A6%86|%E7%81%B5%E5%85%89%E7%81%AF%E6%B3%A1|%E9%BB%91%E6%B0%B4%E6%8A%A5%E5%91%8A|%E6%BC%94%E8%AE%B2|%E5%85%B6%E4%BB%96)\/?.*/g, getIndexHTML);
app.get('/', getIndexHTML);
app.get('/file/*', (req, res) => {
    var htmlPath = getDark(req.headers.cookie) ? './assets/html/file-dark.html' : './assets/html/file.html';
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    checkReq(req, res);
    fs.readFile(htmlPath, "binary", (err, file) => {
        if (err) {
            res.writeHead(404, "not found");
            res.end("<h1>404 NOT FOUND</h1>");
        } else {
            res.write(file, "binary");
            res.end();
        };
    });
});
app.get('/assets/js/*', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    fs.readFile('.' + req.originalUrl, "binary", (err, file) => {
        if (err) {
            res.writeHead(404, "not found");
            res.end("<h1>404 NOT FOUND</h1>");
        } else {
            res.write(file, "binary");
            res.end();
        };
    });
});
app.get('/sitemap.txt', (req, res) => {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    fs.readFile('./assets/sitemap.txt', "binary", (err, file) => {
        if (err) {
            res.writeHead(404, "not found");
            res.end("<h1>404 NOT FOUND</h1>");
        } else {
            res.write(file, "binary");
            res.end();
        };
    });
});

// API
app.post('/api/recaptcha', (req, res) => {
    var ip = getIP(req);
    var key = req.body['key'];
    if (key == undefined) {
        res.send({
            'code': -200,
            'msg': 'key is undefined',
            'data': ''
        });
    };

    const recaptcha = (data) => {
        var outJson = {};
        if (data['success'] == true) {
            outJson = {
                "success": true,
            };
            reqList[ip] = {
                "reCaptcha": false,
                "firstReqTime": process.uptime(),
                "reqNum": 0,
                "whiteStartTime": process.uptime()
            };
        } else {
            outJson = {
                "success": false,
                "error-codes": data['error-codes']
            };
        };
        res.end(JSON.stringify({
            'code': 200,
            'msg': 'msg',
            'data': outJson
        }));
    };
    request.post({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
            secret: reCaptchaKey,
            response: key,
            remoteip: ip
        }
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) recaptcha(JSON.parse(body));
    });
});

app.get('/api/Home', (req, res) => {
    var data = [];
    for (i in dataMapJson) {
        data.push(dataMapJson[i][0])
    };
    var outJSON = JSON.stringify({
        'code': 200,
        'msg': '',
        'data': data
    });
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(outJSON);
});

app.get('/api/list', (req, res) => {
    // ?tag1=1&tag2=2&at=1
    var tag1 = req.query['tag1'];
    var tag2 = req.query['tag2'];
    //如果没有at，默认为1
    var at = req.query['at'] == undefined ? 1 : parseInt(req.query['at']);
    // 如果tag1不在dataMap中，返回错误
    if ((() => {
            var tmp = true;
            for (i in dataMapJson) {
                if (tag1 == dataMapJson[i][0]) {
                    tmp = false;
                };
            };
            return tmp;
        })()) {
        res.end(JSON.stringify({
            'code': -200,
            'msg': 'tag1 not found'
        }));
        return;
    };


    if (tag1 == undefined) {
        var outJSON = JSON.stringify({
            'code': -200,
            'msg': 'tag1 is undefined'
        })
    } else {
        var tag2List;
        for (i in dataMapJson) {
            if (tag1 == dataMapJson[i][0]) {
                tag2List = dataMapJson[i][1];
                break;
            };
        };

        // 如果没有tag2, 使用默认
        if (tag2 == undefined) {
            tag2 = tag2List[0];
        };

        var data = dataJson[tag1][tag2];

        var more = data.length != 1;
        var pagesNum = data.length;
        var list = [];
        for (i in data[at - 1]) {
            list.push(data[at - 1][i]['name']);
        };


        if (tag2List[0] == 'None') {
            tag2List = 'None';
        };
        var outJSON = JSON.stringify({
            'code': 200,
            'msg': '',
            'data': {
                "tag1": tag1,
                "tag2List": tag2List,
                "tag2": tag2,
                "more": more,
                "pageNum": pagesNum,
                "at": at,
                "list": list
            }
        });
    }
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(outJSON);
});

app.get('/api/file', (req, res) => {
    // ?name=123
    var name = req.query['name'];
    if (name == undefined) {
        var outJSON = JSON.stringify({
            'code': -200,
            'msg': 'name is undefined'
        });
    } else {
        var data = undefined;
        for (tag1 in dataJson) {
            for (tag2 in dataJson[tag1]) {
                for (i in dataJson[tag1][tag2]) {
                    for (ii in dataJson[tag1][tag2][i]) {
                        if (name == dataJson[tag1][tag2][i][ii]['name']) {
                            data = {
                                'tag1': tag1,
                                'name': name,
                                'url': dataJson[tag1][tag2][i][ii]['url']
                            };
                            break;
                        };
                    };
                };
                if (data != undefined) break;
            };
            if (data != undefined) break;
        };
        if (data == undefined) {
            var outJSON = JSON.stringify({
                'code': -200,
                'msg': 'name not found'
            });
        } else {
            var outJSON = JSON.stringify({
                'code': 200,
                'msg': '',
                'data': {
                    'tag1': data.tag1,
                    'fileName': data.name,
                    'fileUrl': data.url
                }
            });
        }
    };
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(outJSON);
});

app.get('/api/search', (req, res) => {
    // ?s=123
    var pageSize = 20;
    var at = req.query['at'];
    var keyword = req.query['s'].replace('+', ' ');
    if (at == undefined) at = 1;

    // 搜索
    searchResList = [];
    for (i in searchMapJson) {
        if (eval('/' + keyword + '/gi').test(searchMapJson[i])) {
            searchResList.push(searchMapJson[i]);
        };
    };

    // 分页
    var pages = [];
    var tmpNum = 1;
    while (tmpNum < searchResList.length) {
        var page = [];
        maxTmpNum = tmpNum + pageSize - 1;
        while (tmpNum <= maxTmpNum) {
            if (tmpNum > searchResList.length) break;
            page.push(searchResList[tmpNum - 1]);
            tmpNum += 1;
        };
        pages.push(page);
    };
    searchResList = pages;

    var outJSON = JSON.stringify({
        'code': 200,
        'msg': '',
        'data': {
            'more': searchResList.length != 1,
            'pageNum': searchResList.length,
            'at': at,
            'list': searchResList[at - 1]
        }
    });
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(outJSON);
});

// 404
app.get('*', (req, res) => {
    res.writeHead(404, "not found");
    fs.readFile('./assets/html/404.html', "binary", (err, file) => {
        if (err) {
            res.end("<h1>404 NOT FOUND</h1>");
        } else {
            res.write(file, "binary");
            res.end();
        };
    });
});

app.listen(port, () => {
    console.log("server run at", port);
});