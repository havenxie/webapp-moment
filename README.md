### 显示效果

<img src="show1.gif">

### 安装项目：
1. 将项目git到本地
2. 项目根目录运行 npm install 

### 运行项目：
##### 方法1：
1. 安装chrome插件，就是那个CORS.crx
2. 运行gulp

##### 方法2：
1. 注释gulpfile.js中标注代码
2. controllers.js开启8关闭9行
3. 工程放到WampServer软件的www文件夹下，启动软件。关闭php服务的https安全策略。
4. 运行gulp
5. localhost中找到该工程生成的build文件夹即可运行。

