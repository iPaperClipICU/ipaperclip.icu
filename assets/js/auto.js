function c_auto(name, id, url, type, time, size) {
    var tbody = document.getElementById('auto_tbody');

    var tr = document.createElement('tr');

    var td_1 = document.createElement('td');
    td_1.innerHTML = '<svg width="16" height="16" fill="currentColor"><use xlink:href="#' + type + '"/></svg>';

    var a = document.createElement('a');
    a.setAttribute('href', '#' + id);
    a.setAttribute('data-bs-toggle', 'modal');
    a.innerText = ' ' + name;

    var div_1 = document.createElement('div');
    div_1.setAttribute('class', 'modal fade');
    div_1.setAttribute('id', id);
    div_1.setAttribute('tabindex', '-1');
    div_1.setAttribute('aria-labelledby', id + '-label');
    div_1.setAttribute('aria-hidden', 'true');

    var div_1_1 = document.createElement('div');
    div_1_1.setAttribute('class', 'modal-dialog modal-dialog-centered modal-lg');
    var div_1_1_1 = document.createElement('div');
    div_1_1_1.setAttribute('id', id + '_name_div');
    div_1_1_1.setAttribute('class', 'modal-content');



    var td_2 = document.createElement('td');
    td_2.innerText = time;
    var td_3 = document.createElement('td');
    td_3.innerText = size;

    //上树

    div_1_1.appendChild(div_1_1_1);
    div_1.appendChild(div_1_1);

    td_1.appendChild(a);
    td_1.appendChild(div_1);

    tr.appendChild(td_1);
    tr.appendChild(td_2);
    tr.appendChild(td_3);

    tbody.appendChild(tr);
}

function showVideo(id, config) {
    var url = config[id]['url'];
    var name = config[id]['name'];
    /* <video id="my-video" class="video-js" controls preload="auto" width="495" height="270" data-setup="{}">
        <source src="demo.mp4" type="video/mp4">
        <p class="vjs-no-js">
            要看这个视频，请启用JavaScript，并考虑升级到web浏览器
            <a href="https://videojs.com/html5-video-support/" target="_blank">支持HTML5视频</a>
        </p>
    </video> */

    var video = document.createElement('video');
    video.setAttribute('class', 'video-js');
    video.setAttribute('controls', '');
    video.setAttribute('preload', 'auto');
    video.setAttribute('width', '495');
    video.setAttribute('height', '270');
    video.setAttribute('data-setup', '{}');

    var source = document.createElement('source');
    source.setAttribute('src', url);
    source.setAttribute('type', 'video/mp4');

    var p = document.createElement('p');
    p.setAttribute('class', 'vjs-no-js');
    p.innerHTML = '要看这个视频，请启用JavaScript，并考虑升级到web浏览器 <a href="https://videojs.com/html5-video-support/" target="_blank">支持HTML5视频</a>';


    video.appendChild(source);
    video.appendChild(p);

    var div_header = document.createElement('div');
    div_header.setAttribute('class', 'modal-header');
    div_header.innerHTML = '<h4 class="modal-title" id="video-1-label">' + name + '</h4>';

    var div_body = document.createElement('div');
    div_body.setAttribute('class', 'modal-body');

    var div_body_1 = document.createElement('div');
    div_body_1.setAttribute('class', 'container');
    var div_body_2 = document.createElement('div');
    div_body_2.setAttribute('class', 'row container');
    var div_body_2_1 = document.createElement('div');
    div_body_2_1.setAttribute('class', 'col-md-1 column');
    var div_body_2_2 = document.createElement('div');
    div_body_2_2.setAttribute('class', 'col-md-10 column');
    var div_body_2_3 = document.createElement('div');
    div_body_2_3.setAttribute('class', 'col-md-1 column');

    var div_footer = document.createElement('div');
    div_footer.setAttribute('class', 'modal-footer');
    div_footer.innerHTML = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>';

    var div = document.getElementById(id + '_name_div');
    var script = document.createElement('script');
    script.setAttribute('src', '/assets/js/video.min.js');
    script.setAttribute('defer', '');
    var link = document.createElement('link');
    link.setAttribute('href', '/assets/css/video-js.css');
    link.setAttribute('rel', 'stylesheet');
    //上树
    document.body.appendChild(script);
    document.head.appendChild(link);
    div_body_2_2.appendChild(video);
    div_body_2.appendChild(div_body_2_1);
    div_body_2.appendChild(div_body_2_2);
    div_body_2.appendChild(div_body_2_3);
    div_body_1.appendChild(div_body_2);
    div_body.appendChild(div_body_1);
    div.appendChild(div_header);
    div.appendChild(div_body);
    div.appendChild(div_footer);
}

function deleteVideo(id, config) {
    console.log('已关闭');
    var div = document.getElementById(id + '_name_div');
    div.firstElementChild.remove();
    div.firstElementChild.nextElementSibling.remove();
    div.lastElementChild.remove();
}

for (i in config) {
    var c_name = config[i]['name'];
    var c_id = config[i]['id'];
    var c_url = config[i]['url'];
    var c_type = config[i]['type'];
    var c_time = config[i]['time'];
    var c_size = config[i]['size'];
    c_auto(c_name, c_id, c_url, c_type, c_time, c_size);
    //打开时加载视频
    var modal_bs = document.getElementById(c_id).addEventListener('shown.bs.modal', function(event) {
        var modal_bs_id = event['path'][0].getAttribute('id');
        showVideo(modal_bs_id, config);
    });
    //关闭后删除
    var modal_bs = document.getElementById(c_id).addEventListener('hidden.bs.modal', function(event) {
        var modal_bs_id = event['path'][0].getAttribute('id');
        deleteVideo(modal_bs_id, config);
    })
}