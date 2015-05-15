'use strict';

describe('MainController', function() {
	var $scope, $rootScope, createController;

	beforeEach(module('Playlytics'));
	beforeEach(inject(function($injector) {

		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function() {
			return $controller('MainController as vm', {
				$scope: $scope
			});
		};
	}));

	it('should have default values', function() {
		createController();
		expect($scope.vm.name).toBe('Your playlist');
		expect($scope.vm.totalPop).toEqual(0);
		expect($scope.vm.totalTime).toEqual(0);
		expect($scope.vm.max).toEqual(5);
	});

	it('should have methods', function() {
		createController();
		expect(typeof $scope.vm.addToPlaylist).toBe('function');
		expect(typeof $scope.vm.querySearch).toBe('function');
		expect(typeof $scope.vm.removeTrack).toBe('function');
		expect(typeof $scope.vm.saveToLocal).toBe('function');
		expect(typeof $scope.vm.showAlert).toBe('function');
		expect(typeof $scope.vm.timeConvert).toBe('function');

	})
})