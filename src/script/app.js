
var Moment = angular.module('Moment', ['ngRoute', 'Controllers', 'Directives', 'Services']);

Moment.config(['$routeProvider', function ($routeProvider) {

	$routeProvider.when('/today', {
		templateUrl: './views/today.html',
		controller: 'TodayController'
	})
	.when('/older', {
		templateUrl: './views/older.html',
		controller: 'OlderController'
	})
	.when('/author', {
		templateUrl: './views/author.html',
		controller: 'AuthorController'
	})
	.when('/category', {
		templateUrl: './views/category.html',
		controller: 'CategoryController'
	})
	.when('/favourite', {
		templateUrl: './views/favourite.html',
		controller: 'FavouriteController'
	})
	.when('/settings', {
		templateUrl: './views/settings.html',
		controller: 'SettingsController'
	})
	.when('/today/:id', {
		templateUrl: './views/detail.html',
		controller: 'DetailController'
	})
	.when('/older/:id', {
		templateUrl: './views/detail.html',
		controller: 'DetailController'
	})
	.otherwise({
		redirectTo: '/today'
	});
}]);

Moment.run(['$rootScope','$window','$location','jQLite', function ($rootScope, $window, $location, jQLite) {
	// 设置类名初始值
	$rootScope.collapsed = false;
	$rootScope.menu = true;//默认显示menu
	// 全局方法
	$rootScope.toggle = function () {
		// 改变类名初始值
		$rootScope.collapsed = !$rootScope.collapsed;
		// 获取所有导航
		var $navs = jQLite.$('.navs dd');
		if($rootScope.collapsed) {
			angular.forEach($navs, function(item, index) {//angular用forEach处理之后就变成了dom元素
				item.style.transform = 'translate(0)';
				item.style.transitionDelay = '0.2s';
				item.style.transitionDuration = (index + 1) * 0.15 + 's';
			});
		} else {
			var len = $navs.length - 1;
			angular.forEach($navs, function(item, index) {
				item.style.transform = 'translate(-100%)';
				item.style.transitionDelay = '';
				item.style.transitionDuration = (len - index) * 0.15 + 's';
			});
		}
	}
	$rootScope.goBack = function() {
		$window.history.back();
		$rootScope.menu = true;
	};
	$rootScope.hideShadow = function() {
		$rootScope.collapsed = !$rootScope.collapsed;
	};
	$rootScope.shadowInit = function() {
		var $shdow = jQLite.$('#shadow');
		var $sideBar = jQLite.$('#navs');
		$shdow.on('touchmove', function(e) {
			e.preventDefault();
			e.stopPropagation(); 
		});
		$sideBar.on('touchmove', function(e) {
			e.preventDefault();
			e.stopPropagation(); 	
		});
	};
	$rootScope.shadowInit();
}]);