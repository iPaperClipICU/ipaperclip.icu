var xhr = getXHR(`${window.location.origin}/api/file?name=${window.location.pathname.split('/')[2]}`);
/**
 * {
 *   "tag1": "回形针PaperClip",
 *   "fileName": "test.mp4",
 *   "fileUrl": "https://test"
 * }
 */
xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status === 200 || this.status === 304) {
            ((data) => {
                data = data['data'];
                var fileName = data.fileName;
                var fileUrl = data.fileUrl;

                // Tag1
                var tag1 = document.getElementById('tag1');
                tag1.appendChild((() => {
                    var tmp = document.createElement('li');
                    tmp.setAttribute('class', 'breadcrumb-item');
                    tmp.innerHTML = `<a href="/${data.tag1}">${data.tag1}</a>`;
                    return tmp;
                })())
                tag1.appendChild((() => {
                    var tmp = document.createElement('li');
                    tmp.setAttribute('class', 'breadcrumb-item active');
                    tmp.innerText = fileName;
                    return tmp;
                })())

                // file
                var file = document.getElementById('file');
                if (fileUrl.endsWith('.flv') || fileUrl.endsWith('.mp4')) {
                    file.innerHTML = `<div class="video"><video src="${fileUrl}" controls preload>🤔 您的浏览器不支持 video 标签</video></div>`;
                } else if (fileUrl.endsWith('.jpg') || fileUrl.endsWith('.gif') || fileUrl.endsWith('.png')) {
                    file.innerHTML = `<img src="${fileUrl}" class="img-fluid" alt="${fileName}" />`;
                } else if (fileUrl.endsWith('.mp3') || fileUrl.endsWith('.flac')) {
                    file.innerHTML = `<audio preload="none" controls><source src="${fileUrl}" type="audio/mpeg">🤔 您的浏览器不支持此音频格式</audio>`;
                } else {
                    file.innerHTML = `<p>未知错误，请联系管理员解决</p><p>API Code: ${code}</p><p>API Message: ${msg}</p>`;
                };
            })(JSON.parse(this.responseText));
            removeLoading();
        };
    };
};