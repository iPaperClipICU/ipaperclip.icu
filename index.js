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
app.get('/file', (req, res) => getHTML('./assets/html/file.html', res));
app.get('/search', (req, res) => getHTML('./assets/html/search.html', res));

app.get('/assets/js/*', getAssets);

// API
const dataJson = jsonplus.parse(fs.readFileSync('./data/data.json', 'utf8'))['data'];
const searchMapJson = jsonplus.parse(fs.readFileSync('./data/searchMap.json', 'utf8'));
app.get('/api/Home', (req, res) => {
    var data = [];
    for (i in dataJson) {
        if (dataJson[i]['def'] != 'None') {
            data.push({
                'name': dataJson[i]['name'],
                'url': '/list/' + dataJson[i]['id']
            });
        } else {
            data.push({
                'name': dataJson[i]['name'],
                'url': '/list/' + dataJson[i]['id']
            });
        };
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
    // ?id=25&at=1
    var id = req.query['id'];
    var at = req.query['at'];
    var type = req.query['type'];
    if (at == undefined) at = '1'; //如果没有at，默认为1

    var data = {};
    for (i in dataJson) {
        if (id == dataJson[i]['id']) {
            data = dataJson[i];
            break;
        };
    };
    if (type == 'None') type = data['def']; //如果没有type，默认为data['def']
    var name = data['name'];
    var more = data['list'][type].length != 1;
    var pagesNum = data['list'][type].length;
    var list = [];
    for (i in data['list'][type][at - 1]) {
        list.push({
            'name': data['list'][type][at - 1][i]['name'],
            'id': data['list'][type][at - 1][i]['id']
        });
    };

    var typeList = [];
    for (i in data['list']) typeList.push(i); //获取typeList
    var outJSON = JSON.stringify({
        'code': 200,
        'msg': '',
        'data': {
            'url': [{
                'name': 'Home',
                'url': '/'
            }, {
                'name': name,
                'last': true
            }],
            'type': typeList,
            'pages': {
                'more': more,
                'type': type,
                'at': at,
                'pagesNum': pagesNum,
                'list': list
            }
        }
    });
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(outJSON);
});

app.get('/api/file', (req, res) => {
    // ?id=1
    var id = req.query['id'];

    var data;
    var fileData;
    for (data in dataJson) {
        listData = dataJson[data]['list']
        for (i in listData) {
            for (ii in listData[i]) {
                for (iii in listData[i][ii]) {
                    if (listData[i][ii][iii]['id'] == id) {
                        fileData = listData[i][ii][iii];
                        break;
                    };
                };
                if (fileData != undefined) break;
            };
            if (fileData != undefined) break;
        };
        if (fileData != undefined) {
            data = dataJson[data];
            break;
        };
    };
    var outJSON = JSON.stringify({
        'code': 200,
        'msg': '',
        'data': {
            'url': [{
                'name': 'Home',
                'url': '/'
            }, {
                'name': data['name'],
                'url': '/list/' + data['id']
            }, {
                'name': fileData['name'],
                'last': true
            }],
            'fileUrl': fileData['url']
        }
    });
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
        if (eval('/' + keyword + '/gi').test(i)) {
            searchResList.push({
                'name': i,
                'id': searchMapJson[i]
            });
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