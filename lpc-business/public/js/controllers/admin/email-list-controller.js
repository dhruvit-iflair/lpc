angular.module('inspinia')

    .controller('emailListCtrl', function($loader, env_var, DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        
        getemails();        
        function getemails() {
            $http.get(env_var.apiUrl + '/email')
            .then(function(res) {
                $loader.stop()
                $scope.emails = res.data;       
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
                console.log(err);
            });
        }

        $scope.updateStatus = function(index) {
            $scope.emailId = $scope.emails[index]._id;
            $http.put(env_var.apiUrl + '/emailStatus/' +$scope.emailId)
                .then(function(res) {
                    
                    if ($scope.emails[index].status == 'active') {
                        $scope.emails[index].status = 'inactive';
                    }
                    else{
                        $scope.emails[index].status = 'active';
                    }
                    toastr.success('Email' + ' ' + $scope.emails[index].status + ' ' + 'successfully' )
                    
                }, function(err) {
                    alert('Something went wrong');
                    console.log(err);
                })
        }

        // Deleting a email on email-list state
        $scope.delete = function(index) {
            $scope.emailId = $scope.emails[index]._id;
            
                $ngConfirm({
                    icon: 'fa fa-warning',
                    title: 'Confirm to delete!',
                    content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                    buttons: {
                        sayBoo: {
                            text: 'Delete!',
                            btnClass: 'btn-red',
                            action: function(scope,rootScope, button) {
                                $http.delete(env_var.apiUrl + '/email/' +$scope.emailId)
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