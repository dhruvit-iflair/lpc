angular.module('inspinia')
    .controller('userPackageClassesCtrl', function($scope, $rootScope, $state, $http) {
        
        localStorage.removeItem('classSignupId')
        // localStorage.removeItem('_businessId')
        
        if(localStorage.getItem('_packageClassId')) {
            var id = localStorage.getItem('_packageClassId')
            $http.get('http://192.168.1.50:7575/package/' + id)
                .then(function(res) {
                    $scope.packages = res.data
                }, function(err) {
                    console.log(err)
                })
        } else {
            $state.go('user.class')
        }


        // $scope.goToLocal = function(p) {
        //     console.log(p._businessId)
        //     localStorage.setItem('_businessId', p._businessId._id)
        //     $state.go('user.locallpc', {name: p._businessId.firstname})
        // }

        // $scope.classSignUp = function (p) {
        //     console.log(p.id)
        //     localStorage.setItem('classSignupId', p._id )
        //     $state.go('user.classSignup')
        // }
    })