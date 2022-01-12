(function(w, d, s, q, i) {
w[q] = w[q] || [];
var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
j.async = true;
j.id = 'beacon-aplus';
j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js';
f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'aplus_queue', '203467608');

//集成应用的appKey
aplus_queue.push({
  action: 'aplus.setMetaInfo',
  arguments: ['appKey', 'xxxxxxx']
});