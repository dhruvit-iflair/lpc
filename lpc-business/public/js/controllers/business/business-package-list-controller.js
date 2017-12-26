angular.module('inspinia')
.controller('businessPackageListCtrl', function($loader, env_var, DTOptionsBuilder, toastr, $ngConfirm, $state, $timeout, $scope, $rootScope, $http) {
    
    localStorage.removeItem('packageId');
    
    getData();
    function getData() {
        $http.get(env_var.apiUrl + '/getUserPackage/' + $rootScope.user._id)
            .then(function(res) {
                $loader.stop()
                $scope.packages = res.data
            }, function(err) {
                console.log(err);
            })
    }
    

    $scope.delete = function(index) {
        $scope.packageId = $scope.packages[index]._id; 
        $scope.packageName = $scope.packages[index].business_name; 
        $ngConfirm({
        icon: 'fa fa-warning',
        title: 'Confirm to delete!',
        content: 'Are you sure to delete : <strong>{{packageName}}</strong> !!!',
        buttons: {
            sayBoo: {
                text: 'Delete!',
                btnClass: 'btn-red',
                action: function(scope,rootScope, button) {
                    $http.delete(env_var.apiUrl + '/package/' +$scope.packageId)
                        .then(function(res) {
                            getData()
                        }, function(err) {
                            console.log(err);
                        })
                }
            },
            close: {
                text: 'Close',
                btnClass: 'btn-dark',
                close: function(scope, button){
                
                }
            }
        }
        })
    }

    $scope.editBussPackage = function(index) {
        localStorage.setItem('packageId', $scope.packages[index]._id);
        $state.go('user.buss.package');
    }
})