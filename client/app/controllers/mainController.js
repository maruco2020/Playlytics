(function(){
	'use strict';

	angular.module('Playlytics')

	.controller('MainController', MainController);

	function MainController(){
		var vm = this;
		vm.greeting = 'Hello World';
	}
})();