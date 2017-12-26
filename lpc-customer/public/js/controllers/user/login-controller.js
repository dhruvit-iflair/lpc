angular.module('inspinia')

    .controller('loginCtrl', function ($loader, env_var, $window, AuthInterceptor, toastr, $transitions, $scope, $rootScope, $http, $state, $location) {
        
        $loader.stop()
        $scope.loginData = {};
        $scope.submit = function(loginData) {
            if(this.loginForm.$invalid) {
                $scope.submitted = true
            } else {
                $scope.submitted = false;
                $http.post(env_var.apiUrl + '/login', loginData)
                    .then(function(res) {
                        if(res.status === 401 || res.status === 403) {
                            toastr.error(res.data.message)
                        } else {
                            var payload;
                            AuthInterceptor.saveToken(res.data.token);
                            $rootScope.logData = AuthInterceptor.getToken();
                            payload = $rootScope.logData.split('.')[1];
                            payload = $window.atob(payload);
                            payload = JSON.parse(payload);
                            $state.go('user.default')
                            document.getElementById('lform').reset();
                        }
                    }, function(err) {
                        toastr.error('Please enter correct details!')
                    })
            }   
        }

        $rootScope.logout = function() {
            AuthInterceptor.logout()
        }
    })

