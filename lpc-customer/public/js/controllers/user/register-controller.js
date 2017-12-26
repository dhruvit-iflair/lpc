angular.module('inspinia')
    .controller('registerCtrl', function($loader, env_var, toastr, $stateParams, $scope, $state, $http, $location, $rootScope) {
        
        $loader.stop()
        $scope.title = 'Register to LPC';
        $scope.registerData = {}
        $scope.profileData = {}

        $scope.submit = function(registerData) {
            if(this.registerForm.$invalid) {
                $scope.submitted = true
            }
            else {
                $scope.submitted = false;
                $http.post(env_var.apiUrl + '/customer', registerData)
                    .then(function(res) {
                        if(res.data === 'Email already exists') {
                            toastr.error(res.data, 'Error')
                        } else {
                            alert('Successfully registered, now please login')
                            $state.go('login');
                            document.getElementById('regForm').reset();
                        }
                    }, function(err) {
                        console.log(err)
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('login')
        }
    })