/**
 * 删除Loading
 */
const removeLoading = () => {
    var loading = document.getElementById('loading');
    var search = document.getElementById('search');
    var tag1 = document.getElementById('tag1');

    document.body.removeChild(loading);
    search.style.display = '';
    tag1.style.display = '';
};

/**
 * 获取XHR对象
 * @param {string} url url
 * @returns XHR
 */
const getXHR = (url) => {
    var xhr = (() => {
        var hr;
        if (window.XMLHttpRequest) {
            hr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            // IE
            var versions = [
                "Msxml2.XMLHttp.5.0",
                "Msxml2.XMLHttp.4.0",
                "Msxml2.XMLHttp.3.0",
                "Msxml2.XMLHttp",
                "Microsoft.XMLHttp"
            ];
            try {
                for (var i = 0; i < versions.length; i++) {
                    hr = new ActiveXObject(versions[i]);
                    break;
                };
            } catch (error) {};
        };
        return hr;
    })();
    xhr.open('GET', url);
    xhr.send();

    return xhr;
};

/**
 * 新增query
 * @param {string} key key
 * @param {string} value value
 * @returns 新的query
 */
const addQuery = (key, value) => {
    var query = getQuery(window.location.search);
    query[key] = value;
    var tmp = [];
    for (i in query) {
        if (query[i] != undefined) {
            tmp.push(i + '=' + query[i]);
        };
    };
    return '?' + tmp.join('&');
}

/**
 * 获取query
 * @param {string} data 数据
 * @returns query
 */
const getQuery = (data) => {
    data = data.split('?')[1];
    if (data != undefined) {
        data = data.split('&');
    } else {
        return {};
    };

    query = {};
    for (i in data) {
        tmp = data[i].split('=');
        if (tmp[1] != '') {
            query[tmp[0]] = tmp[1];
        } else {
            query[tmp[0]] = undefined;
        };
    };

    return query;
};

/**
 * 当API返回错误信息时，显示错误信息
 * @param {string} msg message
 */
const APIError = (msg) => {
    var apiError = document.getElementById('api-error');
    var node = document.createElement('div');
    node.innerText = 'API Error: ' + msg;
    apiError.appendChild(node);
    apiError.style = '';
    document.body.removeChild(document.getElementById('loading'));
};

const dark = (() => {
    var tmp = document.cookie.split('; ');
    var cookie = {};
    for (i in tmp) cookie[tmp[i].split('=')[0]] = tmp[i].split('=')[1];
    if (cookie.dark == undefined || cookie.dark == '' || cookie.dark == 'false' || cookie.dark == false) {
        return false;
    } else {
        return true;
    };
})();

document.getElementById("dark").onclick = () => {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)); //30天
    if (dark) document.cookie = 'dark=false; expires=' + d.toGMTString() + '; path=/'
    else document.cookie = 'dark=true; expires=' + d.toGMTString() + '; path=/';
    location.reload();
};