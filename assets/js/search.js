const changeHTML = (data, s, at) => {
    var code = data['code'];
    var msg = data['msg'];
    data = data['data'];

    // list 列表
    var list = document.getElementById('list');
    for (i in data[at - 1]) {
        var name = data[at - 1][i];

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

        list.appendChild((() => {
            var node = document.createElement('a');
            node.innerHTML = icon + ' ' + name.replace(/\.[^.]+$/, '');
            node.href = '/file/' + name;
            node.setAttribute('class', 'list-group-item list-group-item-action');
            return node;
        })());
    };

    // 生成node
    const addNode = (type, pagination, s, at) => {
        var node = document.createElement('li');
        if (type == 'a') {
            node.innerHTML = '<a class="page-link" href="?s=' + s + '&at=' + at + '">' + at + '</a>';
            node.setAttribute('class', 'page-item');
        } else if (type == 'span') {
            node.innerHTML = '<span class="page-link">' + at + '</span>';
            node.setAttribute('class', 'page-item active');
        } else if (type == '.') {
            node.innerHTML = '<span class="page-link">...</span>';
            node.setAttribute('class', 'page-item disabled');
        };
        pagination.appendChild(node);
    };
    // pagination 分页
    if (data.length != 1) {
        var maxButton = Math.floor(document.getElementById('list').clientWidth / 44.77);
        var pagination = document.getElementById('pagination');
        // 上一页
        if (at != 1) {
            pagination.appendChild((() => {
                var node = document.createElement('li');
                node.innerHTML = '<a class="page-link" href="?s=' + s + '&at=' + (at - 1) + '" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>';
                node.setAttribute('class', 'page-item');
                return node;
            })());
        } else {
            pagination.appendChild((() => {
                var node = document.createElement('li');
                node.innerHTML = '<span class="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span></span>';
                node.setAttribute('class', 'page-item disabled');
                return node;
            })());
        };
        // 指定页面
        if (data.length < maxButton) {
            // 正常显示
            for (var i = 1; i <= data.length; i++) {
                if (i != at) {
                    addNode('a', pagination, s, i);
                } else {
                    addNode('span', pagination, s, i);
                };
            };
        } else {
            // 异常显示
            // 1 2 3 4 5 6 7 8 9 10 (最多5)
            if (at == data.length - maxButton + 1 || at == data.length - maxButton + 2) {
                // 6 7 8 9 10
                console.log('11 12');
                for (var i = data.length - maxButton + 1; i <= data.length; i++) {
                    if (i != at) {
                        addNode('a', pagination, s, i);
                    } else {
                        addNode('span', pagination, s, i);
                    };
                };
            } else if (at >= data.length - maxButton + 3) {
                // 1 ... 8 9 10
                console.log(maxButton - (data.length - at));

                for (var i = 1; i <= (maxButton - (data.length - at) - 2); i++) {
                    addNode('a', pagination, s, i);
                };
                addNode('.', pagination)
                for (var i = at; i <= data.length; i++) {
                    if (i != at) {
                        addNode('a', pagination, s, i);
                    } else {
                        addNode('span', pagination, s, i);
                    };
                };
            } else {
                // 1 2 3 ... 10
                addNode('span', pagination, s, at);
                for (var i = at + 1; i < at + maxButton; i++) {
                    if (i == at + maxButton - 2) {
                        addNode('.', pagination);
                    } else if (i == at + maxButton - 1) {
                        addNode('a', pagination, s, data.length);
                    } else {
                        addNode('a', pagination, s, i);
                    };
                };
            };
        };
        // 下一页
        if (at != data.length) {
            pagination.appendChild((() => {
                var node = document.createElement('li');
                node.innerHTML = '<a class="page-link" href="?s=' + s + '&at=' + (at + 1) + '" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>';
                node.setAttribute('class', 'page-item');
                return node;
            })());
        } else {
            pagination.appendChild((() => {
                var node = document.createElement('li');
                node.innerHTML = '<span class="page-link" aria-label="Next"><span aria-hidden="true">&raquo;</span></span>';
                node.setAttribute('class', 'page-item disabled');
                return node;
            })());
        };
    };
};

var s = getQuery(window.location.search)['s'];
var at = getQuery(window.location.search)['at'];
if (s == undefined) {
    s = '';
};
if (at == undefined || at == '') {
    at = 1;
} else {
    at = parseInt(at);
};

if (s != '') {
    var xhr = getXHR('GET', window.location.origin + '/api/search?s=' + s);

    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status === 200 || this.status === 304) {
                var resJson = JSON.parse(this.responseText);
                changeHTML(resJson, s, at);
                removeLoading();
            };
        };
    };
} else {
    var info = document.getElementById('info');
    info.style.display = 'block';
    removeLoading();
}