angular.module('inspinia')
.controller('cmsCtrl', function(env_var, AuthInterceptor, $location, $stateParams, $window, $state, $timeout, $location, $scope, $http, $rootScope, $anchorScroll) {

    var a = $location.path();
    var b = a.charAt(1).toUpperCase() + a.substring(2);

    $http.get(env_var.bizApiUrl + '/cmsT/' +b)
        .then(function(res) {
            $scope.cmsPage = res.data;
        })

})