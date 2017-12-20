angular.module('inspinia')

    .controller('loginCtrl', function ($window, AuthInterceptor, toastr, $transitions, $scope, $rootScope, $http, $state, $location) {
        
        $http.get('/role')
            .then(function(res) {
                $scope.roles = res.data
            })

        $scope.loginData = {};
        $scope.submit = function(loginData) {
            if(this.loginForm.$invalid) {
                $scope.submitted = true
            } else {
                $scope.submitted = false;
                $http.post('/login', loginData)
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

                            $scope.userRole;
                            for(var i= 0; i< $scope.roles.length; i++) {
                                if($scope.roles[i]._id.indexOf(payload.role_id) != -1) {
                                    $scope.userRole = $scope.roles[i].title
                                }
                            }

                            if($scope.userRole == 'admin') {
                                $state.go('index.dashboard')
                            } else {
                                if($rootScope.currentPath) {
                                    //console.log($rootScope.currentPath)
                                    $state.go($rootScope.currentPath)
                                } else if($rootScope.restrictedAfterLogin) {
                                    //console.log($rootScope.restrictedAfterLogin);
                                    $state.go($rootScope.restrictedAfterLogin);
                                } else {
                                    $state.go('user.home')
                                }
                            }
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

