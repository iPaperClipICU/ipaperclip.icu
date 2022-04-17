const express = require('express');
const cors = require('cors');
const fs = require("fs");
const jsonplus = require('jsonplus');
const app = express();

const port = 7799;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// WEB
const outFile = (res, err, file) => {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    if (err) {
        res.writeHead(404, "not found");
        res.end("<h1>404 NOT FOUND</h1>");
    } else {
        res.write(file, "binary");
        res.end();
    };
};
const getHTML = (path, res) => fs.readFile(path, "binary", (err, file) => outFile(res, err, file));
const getAssets = (req, res) => fs.readFile('.' + req.originalUrl, "binary", (err, file) => outFile(res, err, file));

app.get('/', (req, res) => getHTML('./assets/html/Home.html', res));
app.get('/list/*', (req, res) => getHTML('./assets/html/list.html', res));
app.get('/file/*', (req, res) => getHTML('./assets/html/file.html', res));
app.get('/search', (req, res) => getHTML('./assets/html/search.html', res));

app.get('/assets/js/*', getAssets);
app.get('/sitemap.txt', (req, res) => getHTML('./assets/siteMap.txt', res));

// API
const dataJson = jsonplus.parse(fs.readFileSync('./data/data.json', 'utf8'));
const dataMapJson = jsonplus.parse(fs.readFileSync('./data/dataMap.json', 'utf8'))['data'];
const searchMapJson = jsonplus.parse(fs.readFileSync('./data/searchMap.json', 'utf8'))['data'];
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
    var at = req.query['at'];
    //如果没有at，默认为1
    if (at == undefined) {
        at = 1;
    } else {
        at = parseInt(at);
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

        var outJSON = JSON.stringify({
            'code': 200,
            'msg': '',
            'data': {
                'url': [{
                    'name': 'Home',
                    'url': '/'
                }, {
                    'name': tag1,
                    'last': true
                }],
                'tag2List': tag2List,
                'pages': {
                    'more': more,
                    'tag2': tag2,
                    'at': at,
                    'pagesNum': pagesNum,
                    'data': list
                }
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
        })
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
        var outJSON = JSON.stringify({
            'code': 200,
            'msg': '',
            'data': {
                'url': [{
                    'name': 'Home',
                    'url': '/'
                }, {
                    'name': data['tag1'],
                    'url': '/list/' + data['tag1']
                }, {
                    'name': data['name'],
                    'last': true
                }],
                'fileUrl': data['url']
            }
        });
    }
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(outJSON);
});

app.get('/api/search', (req, res) => {
    // ?s=123
    var pageSize = 20;
    var keyword = req.query['s'];
    keyword = keyword.replace('+', ' ');

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
        'data': searchResList
    });
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(outJSON);
});

app.listen(port, () => {
    console.log("server run at", port);
});