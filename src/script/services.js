// 创建一个模块用来管理所有的服务，其实我并不喜欢这样，但是懒得改了
angular.module('Services', ['Services'])
//创建获取后台数据的服务
.service('ApiService', ['$http', '$rootScope', function($http, $rootScope){
    this.connectApi = function(url, success, error) {
    	$rootScope.loaded = false;
		$http({
			// url: './api/api.php', //在wampServer软件里运行开启此项，但是要注释gulp相关代码
			url: url,//启动浏览器插件并且解除julp文件注释后使用该选项
			method: 'get',
			params: {demo: url}
		}).then(function (res) {
			$rootScope.loaded = true;
			var info= res.data;
			console.log(info);
			success(info);

		}).catch(function(res) {
			console.log(res);
			error(info);
		});
	};
}])
//创建修改标题栏显示服务
.service('TitleService', ['$rootScope', '$document', function($rootScope, $document){
	/**
	 * [configTitle description]
	 * @param  {[type]} text       [标题栏显示的文本]
	 * @param  {[type]} navIndex   [对应导航栏索引]
	 * @param  {[type]} searchFlag [搜索图标显示开关]
	 * @param  {[type]} warnFlag   [提示图标显示开关]
	 * @return {[type]}            [null]
	 */
	this.configTitle = function(text, navIndex, searchFlag, warnFlag) {
		$rootScope.loaded = true;
		$rootScope.title = text;
		$rootScope.index = navIndex;
		$rootScope.search = searchFlag;
		$rootScope.warn = warnFlag;
	};
}])
.service('jQLite', ['$rootScope',  function($rootScope){
	this.$ = function(elem) {
		if(!elem)
			return null;
		var resDom = document.querySelectorAll(elem);
		return (resDom ? angular.element(resDom) : null);
	};
	this.dom = function(elem) {
		if(!elem)
			return null;
		return document.querySelector(elem);
	};
	this.doms = function(elem) {
		if(!elem)
			return null;
		return document.querySelectorAll(elem);
	};

}])