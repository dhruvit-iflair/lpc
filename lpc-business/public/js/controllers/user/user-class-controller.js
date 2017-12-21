angular.module('inspinia')
    .controller('userClassCtrl', function(env_var, $scope, $rootScope, $state, $http) {
        
        localStorage.removeItem('signup2');
        
        $scope.classes = [];
        $http.get(env_var.apiUrl + '/class')
            .then(function(res) {
                $scope.currentDate = new Date().toISOString();
                // For removing dates past current date
                for(var i= 0; i< res.data.length; i++) {
                    if($scope.currentDate <= res.data[i].date) {
                        $scope.classes.push(res.data[i])
                    }
                }
            }, function(err) {
                $state.go('user.home')
            })

        $scope.page = ''
        $http.get(env_var.apiUrl + '/package')
            .then(function(res) {
                $scope.packages = res.data
            }, function(err) {
                $state.go('user.home')
            })

        $scope.classSignUp = function (c) {
            console.log(c.price)
            localStorage.setItem('classSignupId', c._id )
            $state.go('user.classSignup')
        }
    })