angular.module('inspinia')

    .controller('packageListCtrl', function(DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {

        $http.get('/package')
            .then(function(res) {
                $scope.packages = res.data
            }, function(err) {
                console.log(err);
            })

            $scope.updateStatus = function(index) {
                $scope.packageId = $scope.packages[index]._id;
                $http.get('/packageStatus/' +$scope.packageId)
                    .then(function(res) {
                        
                        if ($scope.packages[index].status == 'active') {
                            $scope.packages[index].status = 'inactive';
                        }
                        else{
                            $scope.packages[index].status = 'active';
                        }
                        toastr.success('Package' + ' ' + $scope.packages[index].status + ' ' + 'successfully' )
                        
                    }, function(err) {
                        alert('Something went wrong');
                        console.log(err);
                    })
            }

            $scope.delete = function(index) {
                $scope.packageId = $scope.packages[index]._id;
                $ngConfirm({
                    icon: 'fa fa-warning',
                    title: 'Confirm to delete!',
                    content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                    buttons: {
                        sayBoo: {
                            text: 'Delete!',
                            btnClass: 'btn-red',
                            action: function(scope,rootScope, button) {
                                $http.delete('/package/' +$scope.packageId)
                                    .then(function(res) {
                                        $state.go('.', {}, {reload: true});
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
                });
            }
    })
        