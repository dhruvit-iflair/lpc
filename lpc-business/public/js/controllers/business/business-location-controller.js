angular.module('inspinia')
    .controller('businessLocationCtrl', function($timeout, toastr, $http, $scope, $rootScope, $state) {
        
        $scope.locationData = {};

        $scope.submit = function(locationData) {
            if(this.locationForm.$invalid) {
                $scope.submitted = true;
            } else {
                const l_data = {
                    'address': locationData.address,
                    '_businessId': $rootScope.user._id
                }
                $scope.submitted = false;
                $scope.saved = true;
                $http.post('/address', l_data)
                    .then(function(res) {                         
                        toastr.success('Address saved successfully')
                        $timeout(function() {
                            $state.go('user.buss.locationlist')
                        }, 3000)
                        angular.element(document.querySelector('#location_form').reset())
                    }, function(err) {
                        toastr.error('Something went wrong')
                    })
                
            }
        }

        if(localStorage.getItem('addressId')) {
            var id = localStorage.getItem('addressId');
            $http.get('/address/' +id)
                .then(function(res) {
                    $scope.editLocation = true
                    $scope.locationData = res.data;
                }, function(err) {
                    $state.go('user.buss.location')
                })
        }

        $scope.update = function(locationData) {
            if(this.locationForm.$invalid) {
                $scope.submitted = true
            } else {
                $scope.submitted = false;
                $scope.saved = true;
                const l_data = {
                    'address': locationData.address,
                    '_businessId': $rootScope.user._id
                }
                $http.put('/address/' + id, l_data)
                    .then(function(res) {
                        $scope.submitted = false;
                        $scope.saved = true;
                        $scope.editLocation = false
                        toastr.success('Address saved successfully')
                        $timeout(function() {
                            $state.go('user.buss.locationlist')
                        }, 3000)
                        angular.element(document.querySelector('#location_form').reset())
                    }, function(err) {
                        toastr.error('Something went wrong')
                    })
            }
        }

        $scope.cancel = function() {
            localStorage.removeItem('addressId');
            $state.go('user.buss.locationlist')
        }
    })