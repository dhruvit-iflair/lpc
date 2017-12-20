angular.module('inspinia')
    .controller('customerKidListCtrl', function($ngConfirm, $scope, $state, $rootScope, $http) {
        
        localStorage.removeItem('kidId');
        localStorage.removeItem('addKid')

        getData()
        function getData() {
            $http.get('/getKidByUser/' +$rootScope.user._id)
                .then(function(res) {
                    $scope.kids = res.data;
                }, function(err) {
                    $state.go('user.cust.kid')
                })

        }
        
        $scope.editKid = function(kid) {
            localStorage.setItem('kidId', kid._id);
            $state.go('user.cust.kid')
        }

        $scope.delete = function(kid) {
            $scope.kidId = kid._id; 
            $scope.kidName = kid.firstname; 
            $ngConfirm({
                icon: 'fa fa-warning',
                title: 'Confirm to delete!',
                content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                buttons: {
                    sayBoo: {
                        text: 'Delete!',
                        btnClass: 'btn-red',
                        action: function(scope,rootScope, button) {
                            $http.delete('/kid/' +$scope.kidId)
                                .then(function(res) {
                                    getData();
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
    })