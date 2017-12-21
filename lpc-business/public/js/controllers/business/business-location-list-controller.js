angular.module('inspinia')
    .controller('businessLocationListCtrl', function(env_var, $ngConfirm, toastr, $http, $state, $scope, $rootScope, $state) {
        
        localStorage.removeItem('addressId')

        getData()
        function getData() {
        $http.get(env_var.apiUrl + '/getAddressByUser/' +$rootScope.user._id)
            .then(function(res) {
                $scope.addresses = res.data;
            }, function(err) {
                $state.go('user.buss.classlist')
            })
        }

        $scope.editAddress = function(l) {
            localStorage.setItem('addressId', l._id)
            $state.go('user.buss.location')
        }

        $scope.delete = function(l) {
            $scope.locationId = l._id; 
            $scope.locationName = l.address; 
            $ngConfirm({
            icon: 'fa fa-warning',
            title: 'Confirm to delete!',
            content: 'Are you sure to delete : <strong>{{locationName}}</strong> !!!',
            buttons: {
                sayBoo: {
                    text: 'Delete!',
                    btnClass: 'btn-red',
                    action: function(scope,rootScope, button) {
                        $http.delete(env_var.apiUrl + '/address/' +$scope.locationId)
                            .then(function(res) {
                                getData()
                            }, function(err) {
                                toastr.error('Something went wrong')
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
    })