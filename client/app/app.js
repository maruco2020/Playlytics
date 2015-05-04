(function(){
	'use strict';

	angular.module('Playlytics', [
		'ngMaterial',
		'ui.router',
		'ng-sortable',
		'ngMdIcons'
	])

	.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('/', {
				url: '/',
				templateUrl: 'client/app/views/main.html',
				controller: 'MainController',
				controllerAs: 'vm'
			})
	}
})();