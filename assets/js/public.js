const removeLoading = () => {
    var loading = document.getElementById('loading');
    var search = document.getElementById('search');
    var tag1 = document.getElementById('tag1');

    document.body.removeChild(loading);
    search.style.display = '';
    tag1.style.display = '';
};

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