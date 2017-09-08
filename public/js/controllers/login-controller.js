angular.module('inspinia')

    .controller('loginCtrl', function ($transitions, $scope, $rootScope, $http, $state, $location, AuthService) {
        
        $scope.loginData = {};
        $scope.submit = function(loginData) {
            if(this.loginForm.$invalid) {
                alert('All fields are necessary ')
            } else {
                $http.post('/login', loginData)
                    .then(function(res) {
                        //$location.path('/admin/main');
                        // $state.go('index.dashboard')
                        $state.go('package.package-list')
                        document.getElementById('lform').reset();
                    }, function(err) {
                        alert('Invalid credentials')
                    })
            }   
        }

        $scope.logout = function() {
            AuthService.logout()
                .then(function(res) {
                    //$state.go('index.dashboard');
                    //$state.go('.', {}, {reload: true})
                    $state.go('login');
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.login = function() {
            // console.log($state.current.name);
            // $rootScope.stateName = $state.current.name;
            $state.go('login');
        }
    })

