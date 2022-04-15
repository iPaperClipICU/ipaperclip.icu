const changeHTML = (data) => {
    // url
    var urlList = document.getElementById('urlList');
    for (i in data['data']['url']) {
        var name = data['data']['url'][i]['name'];
        var url = data['data']['url'][i]['url'];
        var last = data['data']['url'][i]['last'];
        if (last) {
            urlList.appendChild(((name) => {
                var node = document.createElement('li');
                node.setAttribute('class', 'breadcrumb-item active');
                node.setAttribute('aria-current', 'page');
                node.innerText = name;
                return node;
            })(name));
            // 设置title
            document.title = 'iPaperClipICU - ' + name;
        } else {
            urlList.appendChild((() => {
                var node = document.createElement('li');
                node.setAttribute('class', 'breadcrumb-item');
                node.innerHTML = '<a href="' + url + '">' + name + '</a>';
                return node;
            })());
        };
    };

    // file
    var file = document.getElementById('file');
    var fileUrl = data['data']['fileUrl'];
    var fileName = ((fileUrl) => {
        var tmp = fileUrl.split('/');
        return tmp[tmp.length - 1];
    })(fileUrl);
    if (fileUrl.endsWith('.flv') || fileUrl.endsWith('.mp4')) {
        file.innerHTML = '<div class="video"><video src="' + fileUrl + '" controls preload>🤔 您的浏览器不支持 video 标签</video></div>';
    } else if (fileUrl.endsWith('.jpg') || fileUrl.endsWith('.gif') || fileUrl.endsWith('.png')) {
        file.innerHTML = '<img src="' + fileUrl + '" class="img-fluid" alt="' + fileName + '" />';
    } else if (fileUrl.endsWith('.mp3') || fileUrl.endsWith('.flac')) {
        file.innerHTML = '<audio preload="none" controls><source src="' + fileUrl + '" type="audio/mpeg">🤔 您的浏览器不支持此音频格式</audio>';
    } else {
        file.innerHTML = '文件读取错误';
    };
};

var id = getQuery(window.location.search)['id'];

var xhr = getXHR('GET', window.location.origin + '/api/file?id=' + id);
xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status === 200 || this.status === 304) {
            var resJson = JSON.parse(this.responseText);
            changeHTML(resJson);
            removeLoading();
        };
    };
};