angular.module('inspinia')
    .service('AuthInterceptor', function($timeout, $location, $http, $window, $state, $rootScope) {
        var user = null;

        function saveToken(token) {
            $window.localStorage['mean-token'] = token;
        }

        function getToken(token) {
            return $window.localStorage['mean-token'];
        }

        function logout() {
            if(localStorage.getItem('role') === 'admin' ) {
                $state.go('login')
            } else {
                $state.go('user.home')
            }
            localStorage.clear();
            for(var prop in $rootScope) {
                if(typeof $rootScope[prop] !== 'function' && prop.indexOf('$') == -1
                    && prop.indexOf('$$') == -1) {
                        delete $rootScope[prop];
                    }
            }
        }

        function isLoggedIn() {
            var token = getToken();
            var payload;
            if(token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                $rootScope.user = payload;
                // $http.get('/role/' +payload.role_id)
                //     .then(function(res) {
                //         localStorage.setItem('role', res.data.title);
                //     })
                
                return payload.exp > Date.now() / 1000;
            } else {
                return false
            }
        }

        function getUserStatus() {
            return $http.get('/status')
                .then(function(res) {
                    if(res.data.status) {
                        console.log(res);
                       user = true
                    } else {
                       user = false
                    }
                }, function(err) {
                    user = false;
                })
        }

        function currentUser() {
            if(isLoggedIn()) {
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                  email : payload.email
                };
            }
        }

        return ({
            saveToken: saveToken,
            getToken: getToken,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            getUserStatus: getUserStatus,
        })

    })