angular.module('inspinia')
.controller('customerClassSignup2Ctrl', function($loader, env_var, $scope, $state, $rootScope, $http) {
    
    localStorage.removeItem('addKid')
    $scope.price;
    if(localStorage.getItem('classSignupId')) {
        var id = JSON.parse(localStorage.getItem('classSignupId'));
        // $scope.price = id.price
        $http.get(env_var.bizApiUrl + '/class/' + id.id)
            .then(function(res) {
                $loader.stop()
                $scope.class = res.data
            }, function(err) {
                console.log(err)
            })    
        
        if(localStorage.getItem('signup2')) {
            $scope.kudos = JSON.parse(localStorage.getItem('signup2'));
            $scope.price = id.price * $scope.kudos.check.length
        } else {
            $state.go('user.classSignup')
        }
        
    } else {
        $state.go('user.class')
    }

    $scope.cancelOrder = function() {
        localStorage.removeItem('signup2')
        localStorage.removeItem('classSignupId')
        $state.go('user.class')
    }

    $scope.goTo = function () {
        var args = JSON.parse(localStorage.getItem('classSignupId'));
        args['price'] = $scope.price;
        localStorage.setItem("classSignupId", JSON.stringify(args));
        
        $state.go('user.payment')
    }
})