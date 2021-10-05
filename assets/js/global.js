var global_footer = document.getElementById('global_footer');
var global_footer_cc = '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://file.hsyhx.top/CC-by-sa.png" /></a>';
var global_footer_statement = '本站与<a href="https://zh.wikipedia.org/wiki/回形针PaperClip">回形针PaperClip</a>无关';
var global_footer_videoFrom = '<a href="https://paper-clips.vercel.app/">资源来源</a>';
var global_footer_mail = '<a href="mailto:hi@ipaperclip.icu">hi@ipaperclip.icu</a>';
var global_footer_paperclipFans = '<a href="https://t.me/paperclipfans">Telegram交流群</a>';
var global_footer_beian = '<a href="https://beian.miit.gov.cn">豫ICP备18018136号-9</a>';
global_footer.innerHTML = 'V1.1.1 | ' + global_footer_cc + ' | ' + global_footer_statement + ' | ' + global_footer_videoFrom + ' | ' + global_footer_mail + ' | ' + global_footer_paperclipFans + ' | ' + global_footer_beian + '<hr>';

var global_title = document.getElementById('global_title');
global_title.onclick = function() {
    window.location.href = "/";
}