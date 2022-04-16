import os, json

def getData(path: str) -> json:
    '''
    获取Data
    {
        '一级分类': {
            '二级分类': [{
                'name': 'Vol.001',
                'url': 'https://Vol.001'
            }]
        }
    }
    '''
    tmp = {}
    for root, dirs, files in os.walk(path):
        if root != path:
            for i in files:
                fileUrl = (root+'/'+i).replace(r'//', r'/').replace('\\', r'/').split(path)[1].split('/') #[一级分类 二级分类 文件名]
                if len(fileUrl) == 2:
                    tag2 = 'None' #无二级分类
                else:
                    tag2 = fileUrl[1] #二级分类
                tag1 = fileUrl[0] #一级分类
                url = 'https://file.hsyhx.top/video/'
                for ii in fileUrl:
                    url += ii+'/'
                url = url[:-1]
                if tag1 not in tmp:
                    tmp[tag1] = {}
                if tag2 not in tmp[tag1]:
                    tmp[tag1][tag2] = []
                tmp[tag1][tag2].append({
                    'name': i,
                    'url': url
                })
    
    return tmp

def getDataMap(data: json) -> list:
    '''
    获取DataMap
    [
        ['一级分类', ['二级分类-1', '二级分类-2', ...]]
    ]
    '''
    with open('./data/dataMap.json', 'r', encoding='UTF-8') as r:
        tmp = json.load(r)
    r.close()
    dataMap = []
    if tmp != {}:
        dataMap = tmp['data']
    else:
        for i in data:
            tag2List = []
            for ii in data[i]:
                tag2List.append(ii)
            dataMap.append([i, tag2List])
    
    return dataMap

def paging(data: json, pageSize: int) -> json:
    '''
    分页
    {
        '一级分类': {
            '二级分类': [
                [{
                    'name': 'Vol.001',
                    'url': 'https://Vol.001'
                }, {}],
                [{
                    'name': 'Vol.002',
                    'url': 'https://Vol.002'
                }, {}]
            ]
        }
    }
    '''
    tmp = {}
    for tag1 in data:
        tmp[tag1] = {}
        for tag2 in data[tag1]:
            tmp[tag1][tag2] = []
            i = data[tag1][tag2]
            
            pages = [] #集合
            tmpNum = 1 #计数
            while tmpNum < len(i):
                page = [] #单页
                maxTmpNum = tmpNum+pageSize-1
                while tmpNum <= maxTmpNum:
                    if tmpNum > len(i):
                        break
                    page.append(i[tmpNum-1])
                    tmpNum += 1
                pages.append(page)
            tmp[tag1][tag2] = pages
    
    return tmp

def getSearchMap(data: json) -> list:
    '''
    获取searchMap
    [
        'Vol.001',
        'Vol.002'
    ]
    '''
    tmp = []
    for tag1 in data:
        for tag2 in data[tag1]:
            for i in data[tag1][tag2]:
                tmp.append(i['name'])
    
    return tmp

def changeHTML(dev: bool):
    '''
    修改HTML
    '''
    for root, dirs, files in os.walk('./assets/html/'):
        for i in files:
            with open(root+i, 'r', encoding='UTF-8') as r:
                tmp = r.read()
            r.close()
            if dev:
                tmp = tmp.replace('src="//file.hsyhx.top/assets/', 'src="/assets/')
            else:
                tmp = tmp.replace('src="/assets/', 'src="//file.hsyhx.top/assets/')
            with open(root+i, 'w', encoding='UTF-8') as w:
                w.write(tmp)
            w.close()

def saveJson(data: json, path: str):
    '''
    保存json
    '''
    with open(path, 'w', encoding='UTF-8') as w:
        json.dump(data, w)
    w.close()

def main():
    ###### Config ######
    dev = False
    refreshData = False
    ####################
    print('------------------------------------------------------')
    print('修改HTML, dev: ', dev)
    changeHTML(dev)
    print('------------------------------------------------------')
    if refreshData:
        print('------------------------------------------------------')
        print('refreshData True')
        print('获取Data')
        data = getData('./iPaperClipICU/')
        tmpData = data #给searchMap
        print('获取DataMap')
        dataMap = getDataMap(data)
        print('分页')
        data = paging(data, 20)
        print('生成searchMap')
        searchMap = getSearchMap(tmpData)
        dataMap = { 'data': dataMap }
        searchMap = { 'data': searchMap }

        print('save: data')
        saveJson(data, './data/data.json')
        print('save: dataMap')
        saveJson(dataMap, './data/dataMap.json')
        print('save: searchMap')
        saveJson(searchMap, './data/searchMap.json')
        print('------------------------------------------------------')

if __name__ == '__main__':
    main()
