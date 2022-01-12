import os
import time

json = {
    'file': ['Home', 'Text', 'PaperClip1', 'PaperClip2', 'PaperClip3', 'Museum1', 'Museum2', 'Other'],
    'config': {
        'PaperClip1': ['视频归档\\PaperClip\\Vol'],
        'PaperClip2': [
            '视频归档\\PaperClip\\Sp', '视频归档\\PaperClip\\Live', '视频归档\\PaperClip\\事务所', '视频归档\\PaperClip\\合作视频',
            '视频归档\\干燥工厂', '视频归档\\基本操作', '视频归档\\灵光灯泡'
        ],
        'PaperClip3': ['视频归档\\原创专辑'],
        'Museum1': ['视频归档\\混乱博物馆\\Vol'],
        'Museum2': ['视频归档\\混乱博物馆\\混乱档案室', '视频归档\\混乱博物馆\\其他'],
        'Other': ['视频归档\\黑水报告', '视频归档\\演讲', '视频归档\\其他']
    },
    'textNav': {
        'Vol': 'Vol(常规视频)',
        'Sp': 'Sp(特别视频)',
        'Df': '干燥工厂',
        'x': '合作视频',
        'Ad': '回形针事务所'
    }
}

# 文字稿导航生成 #
def textNav():
    file = json['textNav']
    for name in file:
        mdOut = '# ' + file[name] + '\n\n'
        for root, dirs, files in os.walk('./docs/文字稿/' + name):
            for i in files:
                if 'README' not in i:
                    (fileName, suffix) = os.path.splitext(i)
                    mdOut = mdOut + '- [' + fileName + '](./' + fileName.replace(' ', '%20') + ')\n'
                    with open('.\\docs\\文字稿\\'+name+'\\README.md', 'w', encoding='utf-8') as r:
                        r.write(mdOut)
                    r.close()

# 初始化Home #
def iniHome():
    os.system('xcopy ".\\docs\\*.md" ".\\build\\tmp\\Home\\" /y') #复制 首页 和 诡辩术
    os.system('xcopy ".\\docs\\README.md" ".\\build\\tmp\\Home\\" /s /y') #复制 导航
    os.system('xcopy ".\\docs\\.vuepress\\" ".\\build\\tmp\\Home\\.vuepress\\" /s /y') #复制 .vuepress

# 初始化文字稿 #
def iniText():
    os.system('xcopy ".\\build\\tmp\\Home\\" ".\\build\\tmp\\Text\\" /s /y') #复制模板
    os.system('xcopy ".\\docs\\文字稿\\" ".\\build\\tmp\\Text\\文字稿\\" /s /y') #复制文字稿

# 初始化 #
def ini():
    config = json['config']
    for i in config:
        os.system('xcopy ".\\build\\tmp\\Home\\" ".\\build\\tmp\\'+i+'\\" /s /y')
        for ii in config[i]:
            os.system('xcopy ".\\docs\\'+ii+'\\" ".\\build\\tmp\\'+i+'\\'+ii+'\\" /s /y')

# Build #
def build():
    file = json['file']
    for i in file:
        os.system('xcopy ".\\build\\tmp\\'+i+'\\" ".\\buildTmp\\" /s /y')
        os.system('yarn autoBuild')
        os.system('xcopy ".\\buildTmp\\.vuepress\\dist\\" ".\\build\\tmp\\'+i+'\\.vuepress\\dist\\" /s /y')
        os.system('rmdir /s/q ".\\buildTmp"')

# dist #
def dist():
    file = json['file']
    for i in file:
        os.system('xcopy ".\\build\\tmp\\'+i+'\\.vuepress\\dist\\" ".\\dist\\" /s /y')
    os.system('xcopy ".\\build\\tmp\\Home\\.vuepress\\dist\\" ".\\dist\\" /s /y')

# Main #
startTime = time.time()

textNav()
iniHome()
iniText()
ini()
build()
dist()
os.system('rmdir /s/q ".\\build\\tmp"') #删除tmp

duration = time.time() - startTime
print('----------------------------------')
if duration > 60:
    print('用时: '+str(round(duration/60, 2))+' min')
else:
    print('用时: '+str(round(duration, 2))+' s')
