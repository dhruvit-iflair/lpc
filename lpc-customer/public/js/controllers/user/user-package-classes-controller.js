angular.module('inspinia')
    .controller('userPackageClassesCtrl', function(env_var, $scope, $rootScope, $state, $http) {
        
        localStorage.removeItem('classSignupId')
        // localStorage.removeItem('_businessId')
        
        if(localStorage.getItem('_packageClassId')) {
            var id = localStorage.getItem('_packageClassId')
            $http.get(env_var.bizApiUrl + '/package/' + id)
                .then(function(res) {
                    $scope.packages = res.data
                }, function(err) {
                    console.log(err)
                })
        } else {
            $state.go('user.class')
        }
    })