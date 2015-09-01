#! /usr/bin/env python
# -*- coding:utf-8 -*-

'''
命令行翻译工具,调用的是百度apistore的api:http://apistore.baidu.com/apiworks/servicedetail/118.html
'''
import urllib2,json,sys,os
if len(sys.argv) <= 1:
    print '请输入要查询的词,eg:mdict compact'
    os._exit(0)

query = sys.argv[1]
url = 'http://apis.baidu.com/apistore/tranlateservice/dictionary?query={0}&from=en&to=zh'.format(query)
key = 'e8601992267c65d63cf5bf37c926d3bf'
req = urllib2.Request(url)
req.add_header('apikey',key)
resp = urllib2.urlopen(req)
content = resp.read()
if content:
    content = json.loads(content)
    if content['errNum'] ==0 and len(content['retData']['dict_result']) > 0:
        res = content['retData']['dict_result']['symbols']
        print res
        if len(res) > 0:
            for r in res:
                print '[美]',r['ph_am']
                print '[英]',r['ph_en']
                parts = r['parts']
                for p in parts:
                    print p['part']
                    print '\n'.join(p['means'])
        else:
            print '没有查询到'
    else:
        print '没有查询到'
else:
    print '没有查询到'
