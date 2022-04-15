const removeLoading = () => {
    var loading = document.getElementById('loading');
    var main = document.getElementById('main');

    document.body.removeChild(loading);
    main.style.display = 'block';
};

const getXHR = (mode, url) => {
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
    xhr.open(mode, url);
    xhr.send();

    return xhr;
};

const getQuery = (data) => {
    data = data.split('?')[1];
    if (data != undefined) {
        data = data.split('&');
    } else {
        data = [];
    };

    query = {};
    for (i in data) {
        tmp = data[i].split('=');
        query[tmp[0]] = tmp[1];
    };
    if (query == {}) {
        query = undefined;
    };

    return query;
};

const changeQuery = (window, key, value) => {
    var query = getQuery(window.location.search);
    query[key] = value;
    var tmp = '';
    for (i in query) {
        tmp += i + '=' + query[i] + '&';
    };
    tmp = '?' + tmp.substring(0, tmp.length - 1);
    return tmp;
};