angular.module('inspinia')
.controller('cmsCtrl', function($loader, env_var, AuthInterceptor, $location, $stateParams, $window, $state, $timeout, $location, $scope, $http, $rootScope, $anchorScroll) {

    var a = $location.path();
    var b = a.charAt(1).toUpperCase() + a.substring(2);

    $http.get(env_var.apiUrl + '/cmsT/' +b)
        .then(function(res) {
            $loader.stop()
            $scope.cmsPage = res.data;
        })

})