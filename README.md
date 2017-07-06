# LanguageLearning
js库的维护使用bower

模板类型为jade

Windows下双击run.bat文件之后，在浏览器中访问localhost:3000直接打开。

、	项目开发环境
Windows + webstorm +Node.js + MongoDB
我使用的版本：
Webstorm 11.0.3
Node.js 4.4.5
MongoDB 3.2.7
、	建立数据库表
新建数据库，命名为learningUser，mongo命令”use learningUser”.
然后运行项目，依次访问如下链接：
http://localhost:3000/init
http://localhost:3000/init_aggb
http://localhost:3000/init_mc
http://localhost:3000/init_muc
http://localhost:3000/init_acbg
http://localhost:3000/init_agbc
http://localhost:3000/init_narrative
http://localhost:3000/init_letter
、	特殊说明
当前尝试除用户表以外脱离数据库，直接访问Excel文件来获取数据，因此注释掉了路由中的数据库读取部分，直接从文件中读取。
语音跟读部分需要翻墙VPN才能正常使用功能。
