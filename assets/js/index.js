/**
 * 设置Tag2状态
 * @param {boolean} status 状态
 */
const setTag2Status = (status) => {
    var tag2 = document.getElementById('tag2');
    if (status) {
        tag2.style.display = '';
    } else {
        tag2.style.display = 'none';
    };
};

/**
 * 设置Info状态
 * @param {boolean} status 状态
 */
const setInfoStatus = (status) => {
    var info = document.getElementById('info');
    if (status) {
        info.style.display = '';
    } else {
        info.style.display = 'none';
    };
};

/**
 * 设置Pagination状态
 * @param {boole} status 状态
 */
const setPaginationStatus = (status) => {
    var pagination = document.getElementById('pagination');
    if (status) {
        pagination.style.display = '';
    } else {
        pagination.style.display = 'none';
    };
};

/**
 * 设置Tag1 一级分类  
 * {
 *   "at": "XXX",
 *   "data": [
 *     {
 *       "name": "XXX",
 *       "url": "XXX"
 *     }, { ... }
 *   ]
 * }
 * @param {json} data 数据
 */
const setTag1 = (data) => {
    var tag1 = document.getElementById('tag1');
    tag1.innerHTML = '';
    var at = data.at;
    for (i in data.data) {
        var node = document.createElement('li');
        var name = data.data[i].name;
        var url = data.data[i].url;
        if (data.data[i].name == at) {
            node.setAttribute('class', 'breadcrumb-item active');
            if (dark) node.style.color = '#a4b2be';
            node.innerHTML = name;
        } else {
            if (dark) node.setAttribute('class', 'text-light breadcrumb-item active')
            else node.setAttribute('class', 'breadcrumb-item');
            node.innerHTML = `<a href="${url}">${name}</a>`;
        };
        tag1.appendChild(node);
    };
};

/**
 * 设置Tag2 二级分类  
 * {
 *   "tag1": "回形针PaperClip",
 *   "at": "XXX",
 *   "data": [
 *     "Vol",
 *     "Sp", ...
 *   ]
 * }
 * @param {json} data 数据
 */
const setTag2 = (data) => {
    var tag1 = data.tag1;
    var tag2 = document.getElementById('tag2');
    tag2.innerHTML = '';
    for (i in data.data) {
        var name = data.data[i];
        var node = document.createElement('li');
        node.setAttribute('class', 'nav-item');
        if (name == data.at) {
            if (dark) node.innerHTML = `<a class="bg-dark text-light nav-link active" href="/${tag1}/${name}">${name}</a>`
            else node.innerHTML = `<a class="nav-link active" href="/${tag1}/${name}">${name}</a>`;
        } else {
            if (dark) node.innerHTML = `<a class="nav-link" style="color: #7db2ff;" href="/${tag1}/${name}">${name}</a>`
            else node.innerHTML = `<a class="nav-link" href="/${tag1}/${name}">${name}</a>`;
        };
        tag2.appendChild(node);
    };
    setTag2Status(true);
};

/**
 * 设置List  
 * [
 *   {
 *     "name": "XXX",
 *     "url": "/XXX"
 *   }
 * ]
 * @param {list} data 数据
 */
const setList = (data) => {
    var list = document.getElementById('list');
    list.innerHTML = '';
    for (i in data) {
        var name = data[i].name;
        var url = data[i].url;
        var node = document.createElement('a');
        var icon;
        if (name.endsWith('.flv') || name.endsWith('.mp4')) {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-play" viewBox="0 0 16 16"><path d="M6 6.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 6.454a.5.5 0 0 0-.757.43z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/></svg>';
        } else if (name.endsWith('.jpg') || name.endsWith('.gif') || name.endsWith('.png')) {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-image" viewBox="0 0 16 16"><path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"/></svg>';
        } else if (name.endsWith('.mp3') || name.endsWith('.flac')) {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-music" viewBox="0 0 16 16"><path d="M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.572 2.572 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377.5 0 .974-.134 1.338-.377.36-.24.662-.628.662-1.123V8.89l2-.5V6.64z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/></svg>';
        } else {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg>';
        };
        node.href = url;
        if (dark) node.setAttribute('class', 'bg-dark text-light border-light list-group-item list-group-item-action');
        else node.setAttribute('class', 'list-group-item list-group-item-action');
        node.innerHTML = icon + ' ' + name.replace(/\.[^.]+$/, '');
        list.appendChild(node);
    };
};

/**
 * 设置Pagination  
 * [maxButton, pageNum, at]
 * @param {list} data 数据
 */
const setPagination = (data) => {
    var pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    var maxButton = parseInt(data[0]);
    var pageNum = parseInt(data[1]);
    var at = parseInt(data[2]);
    // 上一页
    pagination.appendChild((() => {
        var node = document.createElement('li');
        if (at != 1) {
            if (dark) node.innerHTML = `<a class="bg-dark border-light page-link" style="color: #7db2ff;" href="${addQuery('at', at - 1)}"><span>&laquo;</span></a>`
            else node.innerHTML = `<a class="page-link" href="${addQuery('at', at - 1)}"><span>&laquo;</span></a>`;
            node.setAttribute('class', 'page-item');
        } else {
            if (dark) node.innerHTML = '<span class="bg-dark text-light border-light page-link"><span>&laquo;</span></span>'
            else node.innerHTML = '<span class="page-link"><span>&laquo;</span></span>';
            node.setAttribute('class', 'page-item disabled');
        };
        return node;
    })());
    // 指定页面
    if (pageNum < maxButton) {
        // 正常显示
        for (var i = 1; i <= pageNum; i++) {
            pagination.appendChild((() => {
                var node = document.createElement('li');
                if (i != at) {
                    if (dark) node.innerHTML = `<a class="bg-dark border-light page-link" style="color: #7db2ff;" href="${addQuery('at', i)}">${i}</a>`
                    else node.innerHTML = `<a class="page-link" href="${addQuery('at', i)}">${i}</a>`;
                    node.setAttribute('class', 'page-item');
                } else {
                    if (dark) node.innerHTML = `<span class="border-light page-link" style="background-color: #7db2ff;">${i}</span>`
                    else node.innerHTML = `<span class="page-link">${i}</span>`;
                    node.setAttribute('class', 'page-item active');
                };
                return node;
            })());
        };
    } else {
        // 异常显示
        // 1 2 3 4 5 6 7 8 9 10 (最多5)
        if (at == pageNum - maxButton + 1 || at == pageNum - maxButton + 2) {
            // 6 7 8 9 10
            for (var i = pageNum - maxButton + 1; i <= pageNum; i++) {
                pagination.appendChild((() => {
                    var node = document.createElement('li');
                    if (i != at) {
                        if (dark) node.innerHTML = `<a class="bg-dark border-light page-link" style="color: #7db2ff;" href="${addQuery('at', i)}">${i}</a>`
                        else node.innerHTML = `<a class="page-link" href="${addQuery('at', i)}">${i}</a>`;
                        node.setAttribute('class', 'page-item');
                    } else {
                        if (dark) node.innerHTML = `<span class="border-light page-link" style="background-color: #7db2ff;">${i}</span>`
                        else node.innerHTML = `<span class="page-link">${i}</span>`;
                        node.setAttribute('class', 'page-item active');
                    };
                    return node;
                })());
            };
        } else if (at >= pageNum - maxButton + 3) {
            // 1 ... 8 9 10
            for (var i = 1; i <= (maxButton - (pageNum - at) - 2); i++) {
                pagination.appendChild((() => {
                    var node = document.createElement('li');
                    if (dark) node.innerHTML = `<a class="bg-dark border-light page-link" style="color: #7db2ff;" href="${addQuery('at', i)}">${i}</a>`
                    else node.innerHTML = `<a class="page-link" href="${addQuery('at', i)}">${i}</a>`;
                    node.setAttribute('class', 'page-item');
                    return node;
                })());
            };
            pagination.appendChild((() => {
                var node = document.createElement('li');
                if (dark) node.innerHTML = '<span class="bg-dark text-light border-light page-link">...</span>'
                else node.innerHTML = '<span class="page-link">...</span>';
                node.setAttribute('class', 'page-item disabled');
                return node;
            })());
            for (var i = at; i <= pageNum; i++) {
                pagination.appendChild((() => {
                    var node = document.createElement('li');
                    if (i != at) {
                        if (dark) node.innerHTML = `<a class="bg-dark border-light page-link" style="color: #7db2ff;" href="${addQuery('at', i)}">${i}</a>`
                        else node.innerHTML = `<a class="page-link" href="${addQuery('at', i)}">${i}</a>`;
                        node.setAttribute('class', 'page-item');
                    } else {
                        if (dark) node.innerHTML = `<span class="bg-dark text-light border-light page-link">${i}</span>`
                        else node.innerHTML = `<span class="page-link">${i}</span>`;
                        node.setAttribute('class', 'page-item active');
                    };
                    return node;
                })());
            };
        } else {
            // 1 2 3 ... 10
            pagination.appendChild((() => {
                var node = document.createElement('li');
                if (dark) node.innerHTML = `<span class="border-light page-link" style="background-color: #7db2ff;">${at}</span>`
                else node.innerHTML = `<span class="page-link">${at}</span>`;
                node.setAttribute('class', 'page-item active');
                return node;
            })());
            for (var i = at + 1; i < at + maxButton; i++) {
                if (i == at + maxButton - 2) {
                    pagination.appendChild((() => {
                        var node = document.createElement('li');
                        if (dark) node.innerHTML = '<span class="bg-dark text-light border-light page-link">...</span>'
                        else node.innerHTML = '<span class="page-link">...</span>';
                        node.setAttribute('class', 'page-item disabled');
                        return node;
                    })());
                } else if (i == at + maxButton - 1) {
                    pagination.appendChild((() => {
                        var node = document.createElement('li');
                        if (dark) node.innerHTML = `<a class="bg-dark border-light page-link" style="color: #7db2ff;" href="${addQuery('at', pageNum)}">${pageNum}</a>`
                        else node.innerHTML = `<a class="page-link" href="${addQuery('at', pageNum)}">${pageNum}</a>`;
                        node.setAttribute('class', 'page-item');
                        return node;
                    })());
                } else {
                    pagination.appendChild((() => {
                        var node = document.createElement('li');
                        if (dark) node.innerHTML = `<a class="bg-dark border-light page-link" style="color: #7db2ff;" href="${addQuery('at', i)}">${i}</a>`
                        else node.innerHTML = `<a class="page-link" href="${addQuery('at', i)}">${i}</a>`;
                        node.setAttribute('class', 'page-item');
                        return node;
                    })());
                };
            };
        };
    };
    // 下一页
    pagination.appendChild((() => {
        var node = document.createElement('li');
        if (at != pageNum) {
            node.innerHTML = `<a class="bg-dark border-light page-link" style="color: #7db2ff;" href="${addQuery('at', at + 1)}"><span>&raquo;</span></a>`;
            node.setAttribute('class', 'page-item');
        } else {
            node.innerHTML = '<span class="bg-dark text-light border-light page-link"><span>&raquo;</span></span>';
            node.setAttribute('class', 'page-item disabled');
        };
        return node;
    })());
    setPaginationStatus(true);
};

var pathname = window.location.pathname.split('/');
var query = getQuery(window.location.search);

if (query['s'] != undefined) {
    /**
     * 搜索
     * {
     *   "more": True/False,
     *   "pageNum": 1,
     *   "at": 1,
     *   "list": []
     * }
     */
    var at = query['at'];
    if (at == undefined) {
        at = '&at=1';
    } else {
        at = '&at=' + at;
    }
    var xhr = getXHR(window.location.origin + '/api/search?s=' + query['s'] + at);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status === 200 || this.status === 304) {
                ((data) => {
                    data = data['data'];
                    setTag2Status(false); //隐藏Tag2
                    setInfoStatus(false); //隐藏Info
                    setPaginationStatus(false); //隐藏Pagination

                    // Tag1
                    setTag1({
                        'at': '搜索',
                        data: [{
                            'name': 'Home',
                            'url': '/'
                        }, { 'name': '搜索' }]
                    });

                    // List
                    setList((() => {
                        var tmp = [];
                        for (i in data.list) {
                            tmp.push({
                                'name': data.list[i],
                                'url': '/file/' + data.list[i]
                            });
                        };
                        return tmp;
                    })());

                    // Pagination
                    if (data.more) {
                        var maxButton = Math.floor(document.getElementById('list').clientWidth / 44.77);
                        setPagination([maxButton, data.pageNum, data.at]);
                    };
                })(JSON.parse(this.responseText));
                removeLoading();
            };
        };
    };
} else if (window.location.pathname == '/') {
    /**
     * Home
     * [
     *     "回形针PaperClip",
     *     "XXXXXX"
     * ]
     */
    var xhr = getXHR(window.location.origin + '/api/Home');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status === 200 || this.status === 304) {
                ((data) => {
                    data = data['data'];
                    setInfoStatus(true); //显示Info

                    // list
                    setList((() => {
                        var tmp = []
                        for (i in data) {
                            tmp.push({
                                'name': data[i],
                                'url': '/' + data[i]
                            });
                        };
                        return tmp;
                    })());
                })(JSON.parse(this.responseText));
                removeLoading();
            };
        };
    };
} else {
    /**
     * list
     * {
     *   "tag1": "回形针PaperClip",
     *   "tag2List": ["Vol", "Sp", ...], //'None'
     *   "tag2": "Vol",
     *   "more": True/False,
     *   "pageNum": 1,
     *   "at": 1,
     *   "list": []
     * }
     */
    var tag1 = pathname[1];
    var tag2 = pathname[2];
    var at = query['at'];
    if (tag2 != undefined && tag2 != '') {
        tag2 = '&tag2=' + tag2;
    } else {
        tag2 = '';
    }
    if (at != undefined && at != '') {
        at = '&at=' + at;
    } else {
        at = '';
    };
    var xhr = getXHR(window.location.origin + '/api/list?tag1=' + tag1 + tag2 + at);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status === 200 || this.status === 304) {
                var resJson = JSON.parse(this.responseText);
                if (resJson['code'] != 200) {
                    APIError(resJson['msg']);
                } else {
                    ((data) => {
                        data = data['data'];

                        // Tag1
                        setTag1({
                            'at': data.tag1,
                            'data': [{
                                'name': 'Home',
                                'url': '/'
                            }, {
                                'name': data.tag1
                            }]
                        });

                        // Tag2
                        if (data.tag2List != 'None') {
                            setTag2({
                                'tag1': data.tag1,
                                'at': data.tag2,
                                'data': data.tag2List
                            });
                        };

                        // List
                        setList((() => {
                            var tmp = [];
                            for (i in data.list) {
                                tmp.push({
                                    'name': data.list[i],
                                    'url': '/file/' + data.list[i]
                                });
                            };
                            return tmp;
                        })());

                        // Pagination
                        if (data.more) {
                            var maxButton = Math.floor(document.getElementById('list').clientWidth / 44.77);
                            setPagination([maxButton, data.pageNum, data.at]);
                        };
                    })(resJson);
                    removeLoading();
                };
            };
        };
    };
};