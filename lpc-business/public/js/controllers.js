angular
    .module('inspinia')
    //.controller('MainCtrl', MainCtrl)
    .controller('MainCtrl', function($rootScope, $scope) {
		$rootScope.global = {
	        search: ''
	    };
    	//$scope.userName = $rootScope.getUser;
    	$scope.helloText = 'Welcome in SeedProject';
    	$scope.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
    })