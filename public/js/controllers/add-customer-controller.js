angular.module('inspinia')

    .controller('addCustomerCtrl', function(toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams) {
            
        $scope.customerData = {};
        $scope.editCustomer = false;
        $scope.title = 'Add Customer';
        $scope.errors = false;

        $scope.close = function() {
            $scope.errors = false;
        }

        function getMessages() {
            var myEl = angular.element(document.querySelectorAll('.ng-invalid'));
            $scope.errMessage = [];
            for(var i= 1; i< myEl.length; i++) {
                if(myEl[i]) {
                    $scope.errors = true
                    $scope.errMessage.push(myEl[i].name + ' ' + 'is required');    
                }
            }
        }

        // For saving new customer on add-customer state
        $scope.success = false
        $scope.submit = function(customerData) {
            $scope.submitted = false;
            if(this.customerForm.$invalid) {
                $scope.submitted = true;
                //getMessages();
                //customerData.$setViewValue(customerData.$dirty);
            } else {
                $http.post('/customer', customerData)
                    .then(function(res) {
                        if(res.data === 'Email already exists') {
                            alert(res.data)
                        } else {
                            $scope.saved = true;
                            document.getElementById('customer_form').reset();
                            $scope.submitted = false;
                            //$scope.success = true
                            toastr.success('Customer created successfully')
                            $timeout(function() {
                                $state.go('customer.customer-list');
                            }, 3000)
                        }
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                        //console.log(err);
                    })
            }
        }

        // Checking if params exists with ui-sref redirect
        // and take to edit state(i.e: add-customer)
        if($stateParams.id) {
            $scope.editCustomer = true;
            $scope.title = 'Edit Customer'
            $http.get('/customer/' +$stateParams.id)
            .then(function(res) {
                $scope.customerData = res.data;
                $scope.customerData.password = null;
            }, function(err) {
                console.log(err);
            })
        }

        // Update customer on add-customer state
        $scope.updateSuccess = false
        $scope.update = function(customerData) {
            if(this.customerForm.$invalid) {
                $scope.submitted = true
            } else {
                $http.put('/customer/' +$stateParams.id, customerData)
                    .then(function(res) {
                        $scope.saved = true;
                        $scope.submitted = false;
                        $scope.editCustomer = false;
                        toastr.success('Customer updated successfully')
                        $timeout(function() {
                            $state.go('customer.customer-list');
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                        //console.log(err);
                    })
            }
        }
        
        // Cancel updating customer
        $scope.cancel = function() {
            $state.go('customer.customer-list');
            $scope.editCustomer = false;
        }
    })