
// 实例一个模块，用来专门管理所有的控制器
angular.module('Controllers', ['Services'])

.controller('DemoController', ['$scope', function ($scope) {
	console.log('启动了');
}])

// 导航菜单
.controller('NavController', ['$scope', function ($scope) {
	// 导航数据
	$scope.navs = [
		{link: '#/today', text: '今日一刻', icon: 'icon-home'},
		{link: '#/older', text: '往期内容', icon: 'icon-file-empty'},
		{link: '#/author', text: '热门作者', icon: 'icon-pencil'},
		{link: '#/category', text: '栏目浏览', icon: 'icon-menu'},
		{link: '#/favourite', text: '我的喜欢', icon: 'icon-heart'},
		{link: '#/settings', text: '设置', icon: 'icon-cog'}
	];
}])

// 今日一刻控制器
.controller('TodayController', [
	'$rootScope',
	'$scope',
	'$filter', 
	'TitleService', 
	'ApiService',
	'$location',
	 function ($rootScope, $scope, $filter, TitleService, ApiService, $location) {
	TitleService.configTitle('今日一刻', 0, true, true);
	var prevPage = $rootScope.prevPage;
	if(prevPage && (prevPage.indexOf('today') > 0))
	{
		$rootScope.prevPage = $location.path();
		return true;
	}
	var today = $filter('date')(new Date, 'yyyy-MM-dd');
	var url = 'https://moment.douban.com/api/stream/date/'+ today + '?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
	ApiService.connectApi(url, function(data) {
		$rootScope.date = data.date;
		$rootScope.posts = data.posts;			
	}, function(err) {
		//todo
	});
}])

// 往期内容
.controller('OlderController', [
	'$rootScope',
	'$scope', 
	'TitleService', 
	'ApiService', 
	'$filter', 
	'$location',
	function ($rootScope ,$scope, TitleService, ApiService, $filter, $location) {
	TitleService.configTitle('往期内容', 1, false, false);
	var prevPage = $rootScope.prevPage;
	if(prevPage && (prevPage.indexOf('older') > 0))
	{
		$rootScope.prevPage = $location.path();
		return true;
	}
	var time = new Date();
	var oldTime = new Date(time.getTime() - 86400000);
	var preDay = $filter('date')(oldTime, 'yyyy-MM-dd');
	var url = 'https://moment.douban.com/api/stream/date/' + preDay + '?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
	ApiService.connectApi(url, function(data) {
		$rootScope.date = data.date;
		$rootScope.posts = data.posts;
	}, function(err) {
		//todo
	});
}])

// 热门作者
.controller('AuthorController', ['$scope', 'TitleService', 'ApiService', function ($scope, TitleService, ApiService) {
	TitleService.configTitle('热门作者', 2, false, false);

	var urlRec = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
	//全部
	var urlAll = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
	ApiService.connectApi(urlRec, function(data) {
		$scope.rec = data.authors;
	}, function(err) {
		//todo
	});
	ApiService.connectApi(urlAll, function(data) {
		$scope.all = data.authors;
	}, function(err) {
		//todo
	});
}])

//栏目浏览
.controller('CategoryController', ['$scope', 'TitleService', 'ApiService', function($scope, TitleService, ApiService){
	TitleService.configTitle('栏目浏览', 3, false, false);

	var url = 'https://moment.douban.com/api/columns?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
	ApiService.connectApi(url, function(data) {
		$scope.columns = data.columns;
	}, function(err) {
		//todo
	});
}])

// 我的喜欢
.controller('FavouriteController', ['TitleService', function(TitleService) {
	TitleService.configTitle('我的喜欢', 4, false, false);
}])

//设置
.controller('SettingsController', ['TitleService', function(TitleService){
	TitleService.configTitle('设置', 5, false, false);
}])

//今日一刻和往期内容的详细页面
.controller('DetailController', [
	'$scope', 
	'$rootScope',
	'$route', 
	'$routeParams', 
	'$location',
	'TitleService',
	'jQLite',
	function($scope, $rootScope, $route, $routeParams, $location, TitleService, jQLite){
	var id = $routeParams.id;
	var scrollTop = document.body.scrollTop;//hack
	if($rootScope.posts) {//有数据就处理详细页内容
		TitleService.configTitle('', null, false, false);
		$rootScope.menu = false;
		$rootScope.prevPage = $location.path();
		var data = $rootScope.posts[id];
		var $view = jQLite.$('.detail');	
		$view.html(data.content);
		if(data.column.id == 26 || data.column.id == 57) {//打鸡血和洗洗睡要独立设置
			return true;
		}	
		// 设置作者链接
		var $authorUrl = jQLite.$('#author a, .author_avatar_link, #footer .author-name a');
		angular.forEach($authorUrl, function(item){
		 	item.href = data.author.url;
		 });
		// 设置头像
		var $authorImg = jQLite.$('#author_avatar, #author_avatar2');
		angular.forEach($authorImg, function(item) {
			item.src = data.author.avatar;
		});
		// 设置文章图片链接
		data.photos.forEach(function(photo, index) {
			var $img = jQLite.$('#'+photo.tag_name);
			$img.attr({
				'src': photo.large.url, 
				'width': photo.large.width, 
				'height': photo.large.height
			});
		});
	} else {//直接刷新详细页将会没有数据，这时转到今日一刻页面即可。
		$location.path('./today');
	}
}])






