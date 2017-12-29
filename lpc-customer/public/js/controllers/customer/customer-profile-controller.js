angular.module('inspinia')
    .controller('customerProfileCtrl', function ($window, $loader, env_var, AuthInterceptor, $state, $scope, $rootScope, $http, toastr, $timeout) {
        
        var id = $rootScope.user._id;
        $scope.profileData = {};
        $rootScope.services = [
            {id: 1, title: 'Holiday Classes'},
            {id: 2, title: 'Classes'}
        ]
        $rootScope.events = [
            {id: 1, title: 'Birthdays'},
        ]
        
        $http.get(env_var.apiUrl + '/customer/' + id)
            .then(function(res) {
                $loader.stop()
                $scope.profileData = res.data;
                $scope.profileData.password = null;
            }, function(err) {
                console.log(err)
            })
        
        $scope.submit = function(profileData) {
            if(this.profileForm.$invalid) {
                $scope.submitted = true
            } else {
                $http.put(env_var.apiUrl + '/customer/' +id, profileData)
                    .then(function(res) {
                        $scope.submitted = false;
                        $scope.saved = true;
                        document.getElementById('profile_form').reset();
                        toastr.success('Data updated successfully')
                        
                        var payload;
                        AuthInterceptor.saveToken(res.data.token);
                        $rootScope.logData = AuthInterceptor.getToken();
                        payload = $rootScope.logData.split('.')[1];
                        payload = $window.atob(payload);
                        payload = JSON.parse(payload);
                        
                        $timeout(function() {
                            $state.go('user.default')
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('user.default')
        }

    })