angular.module('inspinia')
    .factory('AuthService', function($q, $timeout, $http, $rootScope) {
        var user = null;

        return ({
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            logout: logout
        })

        function isLoggedIn() {
            if(user) {
                return true;
            } else {
                return false;
            }
        }

        function getUserStatus() {
            return $http.get('/status')
                .then(function(res) {
                    if(res.data.status) {
                        user = true;
                        $rootScope.userStatus = user
                    } else {
                        user = false
                        $rootScope.userStatus = user
                    }
                }, function(err) {
                    user = false
                })
        }

        function logout() {
            var deferred = $q.defer();
            $http.get('/logout')
                .then(function(res) {
                    user = false;
                    deferred.resolve()
                }, function(res) {
                    user = false;
                    deferred.reject();
                })
                return deferred.promise;
        }

    })