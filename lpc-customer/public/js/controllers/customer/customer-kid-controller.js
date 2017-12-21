angular.module('inspinia')
    .controller('customerKidCtrl', function(env_var, toastr, $scope, $state, $rootScope, $http, $timeout) {
        
        // localStorage.removeItem('addKid')
        $scope.kidData = {}
        $scope.submit = function(kidData) {
            if(this.kidForm.$invalid) {
                $scope.submitted = true
            } else {
                $scope.submitted = false;
                $scope.saved = true;
                kidData['_customerId'] = $rootScope.user._id;
                
                $http.post(env_var.apiUrl + '/kid', kidData)
                    .then(function(res) {
                        toastr.success('Kid added successfully');
                        
                        $timeout(function() {
                            if(localStorage.getItem('addKid')) {
                                $state.go('user.classSignup')
                            } else {
                                $state.go('user.cust.kidlist')
                            }
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong')
                    })
            }
        }
        
        if(localStorage.getItem('kidId')) {
            $scope.editKid = true;
            var id = localStorage.getItem('kidId');

            $http.get(env_var.apiUrl + '/kid/' +id)
                .then(function(res) {
                    $scope.kidData = res.data;
                    $scope.kidData.birthdate = moment($scope.kidData.birthdate).format('MM/DD/YYYY');
                }, function(err) {
                    $state.go('user.kid.kidlist')
                })
        }

        $scope.update = function(kidData) {
            if(this.kidForm.$invalid) {
                $scope.submitted = true
            } else {
                $scope.submitted = false;
                $scope.saved = true;
                $http.put(env_var.apiUrl + '/kid/' +id, kidData)
                    .then(function(res) {
                        $scope.editKid = false
                        toastr.success('Kid data updated successfully')
                        $timeout(function() {
                            $state.go('user.cust.kidlist')
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong')
                    })
            }
        }

        $scope.cancel = function() {
            if(localStorage.getItem('addKid', true)) {
                $state.go('user.classSignup');
            } else {
                localStorage.removeItem('kidId');
                $scope.editKid = false;
                $state.go('user.cust.kidlist')
            }
            
        }
        
    })