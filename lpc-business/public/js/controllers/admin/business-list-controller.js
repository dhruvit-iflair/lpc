angular.module('inspinia')

    .controller('businessListCtrl', function(DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        $http.get('/users')
            .then(function(res) {
                $scope.business = res.data;
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lTfgitp')
                .withButtons([
                    {extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},
                    {extend: 'print',
                        customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');
        
                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]); 
            }, function(err) {
                console.log(err)
            })

            $scope.status = false;
            $scope.updateStatus = function(index) {
                $scope.businessId = $scope.business[index]._id;
                $http.get('/userStatus/' +$scope.businessId)
                    .then(function(res) {
                        if ($scope.business[index].status == 'active') {
                            $scope.business[index].status = 'inactive';
                        }
                        else{
                            $scope.business[index].status = 'active';
                        }
                        toastr.success('User' + ' ' + $scope.business[index].status + ' ' + 'successfully' )
                        // $timeout(function() {
                        //     // toastr.success('Status updated successfully');
                        // }, 1000)
                    }, function(err) {
                        alert('Something went wrong');
                        console.log(err);
                    })
            }

            $scope.delete = function(index) {
                $scope.businessId = $scope.business[index]._id;
                
                $ngConfirm({
                    icon: 'fa fa-warning',
                    title: 'Confirm to delete!',
                    content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                    buttons: {
                        sayBoo: {
                            text: 'Delete!',
                            btnClass: 'btn-red',
                            action: function(scope,rootScope, button) {
                                $http.delete('/users/' +$scope.businessId)
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