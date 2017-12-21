angular.module('inspinia')
    .controller('businessPayoutCtrl', function(env_var, $timeout, $scope, $state, $http, $rootScope, $window) {
        
        $http.get(env_var.apiUrl + '/getpayoutbyId', {params: {id: $rootScope.user._id}})
            .then(function(res) {
                if(res.status == 200 ) {
                    $scope.businessId = true
                }
            }, function(err) {
                if(err) {
                    console.log(err.status + ' ' + err.data)
                }
            })
        
        $scope.getMe = function() {
            $http.get(env_var.apiUrl + '/authorize')
                .then( function(res) {
                    // $window.location.href = (res.data.url, '_blank');
                    window.open(res.data.url, '_blank')
                }, function(err) {
                    console.log(err)
                })
        }
        
        var data = {
            id: $rootScope.user._id
        }
        $scope.deleteMe = function() {
            $http.post(env_var.apiUrl + '/deleteAccount', data)
                .then(function(res) {
                    console.log(res.data)
                }, function(err) {
                    console.log(err)
                })
        }
    })