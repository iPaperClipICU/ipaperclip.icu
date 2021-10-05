var ii = 0;

var div_v_pills_tab = document.createElement('div');
div_v_pills_tab.setAttribute('class', 'nav flex-column nav-pills me-3');
div_v_pills_tab.setAttribute('id', 'v-pills-tab');
div_v_pills_tab.setAttribute('role', 'tablist');
div_v_pills_tab.setAttribute('aria-orientation', 'vertical');

var div_v_pills_tabContent = document.createElement('div');
div_v_pills_tabContent.setAttribute('class', 'tab-content');
div_v_pills_tabContent.setAttribute('id', 'v-pills-tabContent');

for (i in config) {
    ii = ii + 1;

    var div_v_pills_tab_button = document.createElement('button');
    if (ii == 1) {
        div_v_pills_tab_button.setAttribute('class', 'nav-link active');
        div_v_pills_tab_button.setAttribute('aria-selected', 'true');
    } else {
        div_v_pills_tab_button.setAttribute('class', 'nav-link');
        div_v_pills_tab_button.setAttribute('aria-selected', 'false');
    }
    div_v_pills_tab_button.setAttribute('id', 'v-pills-' + i + '-tab');
    div_v_pills_tab_button.setAttribute('data-bs-toggle', 'pill');
    div_v_pills_tab_button.setAttribute('data-bs-target', '#v-pills-' + i);
    div_v_pills_tab_button.setAttribute('type', 'button');
    div_v_pills_tab_button.setAttribute('role', 'tab');
    div_v_pills_tab_button.setAttribute('aria-controls', 'v-pills-' + i);
    div_v_pills_tab_button.innerText = i;
    div_v_pills_tab.appendChild(div_v_pills_tab_button);

    var tbody = document.createElement('tbody');
    for (id in config[i]) {
        var name = config[i][id]['name'];
        var url = config[i][id]['url'];
        var type = config[i][id]['type'];
        var time = config[i][id]['time'];
        var size = config[i][id]['size'];

        // var tr_video = '<video id="' + id + '-video"class="video-js"controls preload="auto"width="495"height="270"data-setup="{}"><source src="' + url + '"type="video/mp4"><p class="vjs-no-js">要看这个视频，请启用JavaScript，并考虑升级到web浏览器<a href="https://videojs.com/html5-video-support/"target="_blank">支持HTML5视频</a></p></video>';
        var tr_modal_1 = '<div class="modal-header"><h4 class="modal-title"id="' + id + '-label">' + name + '</h4><button type="button"class="btn-close"data-bs-dismiss="modal"aria-label="Close"></button></div><div id="' + id + '-modelBody" class="modal-body"></div><div class="modal-footer"><button type="button"class="btn btn-secondary"data-bs-dismiss="modal">关闭</button></div>';
        var tr_modal = '<div class="modal fade"id="' + id + '"tabindex="-1"aria-labelledby="' + id + '-label"aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content">' + tr_modal_1 + '</div></div></div>';
        var tr_td = '<svg width="16"height="16"fill="currentColor"><use xlink:href="#' + type + '"/></svg> <a href="#' + id + '"data-bs-toggle="modal">' + name + '</a>' + tr_modal;
        var tr_HTML = '<td>' + tr_td + '</td><td>' + time + '</td><td>' + size + '</td>';
        var tr = document.createElement('tr');
        tr.innerHTML = tr_HTML;
        tbody.appendChild(tr);


    }
    var thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>文件</th><th>最后更新时间</th><th>大小</th></tr>';
    var table = document.createElement('table');
    table.setAttribute('class', 'table table-striped table-hover');
    table.appendChild(thead);
    table.appendChild(tbody);

    var div_v_pills = document.createElement('div');
    if (ii == 1) {
        div_v_pills.setAttribute('class', 'tab-pane fade show active');
    } else {
        div_v_pills.setAttribute('class', 'tab-pane fade');
    }
    div_v_pills.setAttribute('id', 'v-pills-' + i);
    div_v_pills.setAttribute('role', 'tabpanel');
    div_v_pills.setAttribute('aria-labelledby', 'v-pills-' + i + '-tab');
    div_v_pills.appendChild(table);
    div_v_pills_tabContent.appendChild(div_v_pills);
}
var div_vTab = document.getElementById('div_vTab');
div_vTab.appendChild(div_v_pills_tab);
div_vTab.appendChild(div_v_pills_tabContent);

for (i in config) {
    for (id in config[i]) {
        //打开时加载视频
        var modal_showVideo = document.getElementById(id).addEventListener('shown.bs.modal', function(event) {
            var id = event['path'][0].getAttribute('id');
            showVideo(id, config);
        });
        //关闭后删除
        var modal_deleteVideo = document.getElementById(id).addEventListener('hidden.bs.modal', function(event) {
            var id = event['path'][0].getAttribute('id');
            deleteVideo(id);
        })
    }
}

function showVideo(id, config) {
    var i;
    for (i_tmp in config) {
        for (ii in config[i_tmp]) {
            if (ii == id) {
                i = i_tmp;
                break
            }
        }
    }

    var type = config[i][id]['type']
    var url = config[i][id]['url']
    var name = config[i][id]['name']
    if (type == 'video') {
        var script = document.createElement('script');
        script.setAttribute('src', '/assets/js/video.min.js');
        script.setAttribute('defer', '');
        var link = document.createElement('link');
        link.setAttribute('href', '/assets/css/video-js.css');
        link.setAttribute('rel', 'stylesheet');
        document.body.appendChild(script);
        document.head.appendChild(link);

        var tr_video = '<video id="' + id + '-video"class="video-js"controls preload="auto"width="495"height="270"data-setup="{}"><source src="' + url + '"type="video/mp4"><p class="vjs-no-js">要看这个视频，请启用JavaScript，并考虑升级到web浏览器<a href="https://videojs.com/html5-video-support/"target="_blank">支持HTML5视频</a></p></video>';
        var modelBody = document.getElementById(id + '-modelBody')
        modelBody.innerHTML = tr_video;
    } else if (type == 'audio') {
        var audio = '<audio controls="controls"height="100"width="100"><source src="' + url + '"type="audio/mp3"/><source src="' + url + '"type="audio/flac"/><embed height="100"width="100"src="' + url + '"/></audio>'
        var modelBody = document.getElementById(id + '-modelBody')
        modelBody.innerHTML = audio;
    } else if (type == 'image') {
        var image = '<img src="' + url + '" alt="' + name + '">'
        var modelBody = document.getElementById(id + '-modelBody')
        modelBody.innerHTML = image;
    }
}

function deleteVideo(id) {
    var modelBody = document.getElementById(id + '-modelBody')
    modelBody.firstElementChild.remove();
}