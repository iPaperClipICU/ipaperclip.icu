import os, json

PAGE = 30

def paging(data):
    '''
    分页
    '''
    if len(data) > PAGE:
        # 分页
        returnData = []
        for i in range(0, len(data), PAGE):
            returnData.append(data[i:i+PAGE])
        return returnData
    else:
        return [data]

def getDocPath(filesName, tagName, fileName, docData):
    '''
    获取文字稿路径
    '''
    if filesName == "回形针PaperClip":
        if (tagName == "Vol"):
            for i in docData["Vol"]:
                if (i[:7] == fileName[:7]):
                    # 匹配
                    return f"Vol/{i}"
        elif (tagName == "Sp"):
            for i in docData["Sp"]:
                if (i[:5] == fileName[:5]):
                    # 匹配
                    return f"Sp/{i}"
        elif (tagName == "合作视频"):
            # 虽然这很不优雅, 但是理论上是最节省开发时间的 (
            dic = {
                "PaperClip x Polestar 极星 安全气囊如何用炸药救人？": "x.PoleStar极星 安全气囊如何用炸药救人",
                "PaperClip × dyson 直升机、斯特塔管与吸尘器": "x.dyson 直升机、斯特塔管与吸尘器",
                "PaperClip × OLAY 是什么决定了你的肤色？": "x.OLAY 是什么决定了你的肤色",
                "PaperClip × OPPO 如何成为碰碰车之王？": "x.OPPO 如何成为碰碰车之王？",
                "PaperClip × WWF 如何快速消灭全世界的森林？": "x.WWF 如何快速消灭全世界的森林？",
                # "PaperClip × 《年轮2020》 丈量 202": "",
                "PaperClip × 东方时空 天问一号：登陆火星": "x.东方时空 天问一号：登陆火星",
                "PaperClip × 中央广播电视台 如何下潜海底一万米？": "x.中央广播电视总台 如何下潜海底一万米？",
                "PaperClip × 新华社客户端 民法典如何保护你的当代生活？": "x.新华社客户端 民法典如何保护你的当代生活",
                "PaperClip × 柔宇科技 你究竟需要怎样的屏幕？": "x.柔宇科技 你究竟需要怎样的屏幕？",
                "PaperClip × 梅赛德斯-奔驰 汽车仪表盘如何帮你好好开车？": "x.梅赛德斯-奔驰 汽车仪表盘如何帮你好好开车？",
                "PaperClip × 沃尔沃 如何造一辆舍己救人的汽车？": "x.沃尔沃_2 如何造一辆舍己救人的汽车？",
                "PaperClip × 沃尔沃 汽车车身如何护你周全？": "x.沃尔沃_1 汽车车身如何护你周全？",
                # "PaperClip × 简爱 如何挑选真正的无糖酸奶": "",
                "PaperClip × 蔚来 为什么你的电动汽车越来越不值钱": "x.蔚来_1 为什么你的电动汽车越来越不值钱",
                "PaperClip × 蔚来 自动驾驶为什么这么难？": "x.蔚来_2 自动驾驶为什么这么难？"
            }
            for i in dic:
                if i + ".mp4" == fileName:
                    # 匹配
                    return f"x/{dic[i] + '.md'}"
        elif (tagName == "回形针事务所"):
            for i in docData["Ad"]:
                if i[:6] == "Ad." + fileName[:10].replace("回形针事务所 ", ""):
                    # 匹配
                    return f"Ad/{i}"
    elif filesName == "干燥工厂":
        for i in docData["Df"]:
            if i[:6] == "Df." + fileName[:12].replace("提前动手 Vol.", ""):
                # 匹配
                return f"Df/{i}"
    return None

def main():
    # 获取 docData
    docData = {}
    for filesName in ["Ad", "Df", "Sp", "Vol", "x"]:
        docData[filesName] = []
        filesPath = '..\\..\\paperclipfans\\' + filesName
        for fileName in os.listdir(filesPath):
            filePath = os.path.join(filesPath, fileName)
            if os.path.isfile(filePath):
                docData[filesName].append(fileName)
    
    with open('./FilesData_data.json', 'r', encoding='UTF-8') as r:
        FilesData_data = json.load(r)['data']
    r.close()
    FilesData = {}
    SearchData = {}
    
    for i in FilesData_data:
        tag = len(i) == 2
        tmp = {}
        filesName = i[0]
        
        if (tag):
            # 有Tag
            for tagName in i[1]:
                for root, dirs, files in os.walk('..\\..\\ipaperclip-icu-files\\'+filesName+'\\'+tagName):
                    # SearchData
                    for fileName in files:
                        SearchData[fileName] = [filesName, tagName, getDocPath(filesName, tagName, fileName, docData)]
                    
                    # FilesData
                    tmp[tagName] = paging(files)
                    break
        else:
            # 无Tag
            tagName = None
            for root, dirs, files in os.walk('..\\..\\ipaperclip-icu-files\\'+filesName):
                # SearchData
                for fileName in files:
                    SearchData[fileName] = [filesName, tagName, getDocPath(filesName, tagName, fileName, docData)]
                tmp = paging(files)
                break
        
        FilesData[filesName] = tmp
    
    FilesData = {
        'menuData': FilesData_data,
        'searchData': SearchData,
        'data': FilesData
    }

    with open('./FilesData.json', 'w', encoding='UTF-8') as w:
        json.dump(FilesData, w)
    w.close()

if __name__ == '__main__':
    main()
