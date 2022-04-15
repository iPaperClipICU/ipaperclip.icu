const changeHTML = (data) => {
    var list = document.getElementById('list');
    for (i in data['data']) {
        list.appendChild((() => {
            var node = document.createElement('a');
            node.innerText = data['data'][i]['name'];
            node.href = data['data'][i]['url'];
            node.setAttribute('class', 'list-group-item list-group-item-action');
            return node;
        })());
    };
};

var xhr = getXHR('GET', window.location.origin + '/api/Home');
xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status === 200 || this.status === 304) {
            var resJson = JSON.parse(this.responseText);
            changeHTML(resJson);
            removeLoading();
        };
    };
};