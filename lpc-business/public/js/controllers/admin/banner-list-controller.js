angular.module('inspinia')

    .controller('bannerListCtrl', function($loader, env_var, DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        $http.get(env_var.apiUrl + '/banner')
            .then(function(res) {
                $loader.stop()
                $scope.banner = res.data;
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
                $loader.stop()
                console.log(err)
            })

            $scope.status = false;
            $scope.updateStatus = function(index) {
                $scope.bannerId = $scope.banner[index]._id;
                $http.put(env_var.apiUrl + '/bannerStatus/' +$scope.bannerId)
                    .then(function(res) {
                        if ($scope.banner[index].status == 'active') {
                            $scope.banner[index].status = 'inactive';
                        }
                        else{
                            $scope.banner[index].status = 'active';
                        }
                        toastr.success('Banner' + ' ' + $scope.banner[index].status + ' ' + 'successfully' )
                        
                    }, function(err) {
                        alert('Something went wrong');
                        console.log(err);
                    })
            }

            $scope.delete = function(index) {
                $scope.bannerId = $scope.banner[index]._id;
                
                $ngConfirm({
                    icon: 'fa fa-warning',
                    title: 'Confirm to delete!',
                    content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                    buttons: {
                        sayBoo: {
                            text: 'Delete!',
                            btnClass: 'btn-red',
                            action: function(scope,rootScope, button) {
                                $http.delete(env_var.apiUrl + '/banner/' +$scope.bannerId)
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