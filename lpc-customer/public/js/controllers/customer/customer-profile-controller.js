angular.module('inspinia')
    .controller('customerProfileCtrl', function(env_var, $state, $scope, $rootScope, $http, toastr, $timeout) {
        
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