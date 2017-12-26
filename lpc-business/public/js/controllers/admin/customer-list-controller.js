angular.module('inspinia')

    .controller('customerListCtrl', function($loader, env_var, DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm, $window) {
        
        // $scope.customers = []
        getCustomers();        
        function getCustomers() {
            $http.get(env_var.custApiUrl + '/customer')
            .then(function(res) {
                $loader.stop();
                $scope.customers = res.data;      
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

        $scope.status = false;
        // Updating customer status
        $scope.updateStatus = function(index) {
            $scope.customerId = $scope.customers[index]._id;
            $http.get(env_var.custApiUrl + '/userStatus/' +$scope.customerId)
                .then(function(res) {
                    
                    if ($scope.customers[index].status == 'active') {
                        $scope.customers[index].status = 'inactive';
                    }
                    else{
                        $scope.customers[index].status = 'active';
                    }
                    toastr.success('Customer' + ' ' + $scope.customers[index].status + ' ' + 'successfully' )
                    
                }, function(err) {
                    alert('Something went wrong');
                    console.log(err);
                })
        }

        // Deleting a customer on customer-list state
        $scope.delete = function(index) {
            $scope.customerId = $scope.customers[index]._id;
            $ngConfirm({
                icon: 'fa fa-warning',
                title: 'Confirm to delete!',
                content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                buttons: {
                    sayBoo: {
                        text: 'Delete!',
                        btnClass: 'btn-red',
                        action: function(scope,rootScope, button) {
                            $http.delete(env_var.custApiUrl + '/customer/' +$scope.customerId)
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