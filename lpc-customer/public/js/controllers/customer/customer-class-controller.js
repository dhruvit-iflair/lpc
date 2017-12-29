angular.module('inspinia')
    .controller('customerClassCtrl', function($loader, env_var, $state, $scope, $rootScope, $http, toastr, $timeout) {
        
        $scope.custClasses = []
        allClasses()
        function allClasses() {
            $http.get(env_var.bizApiUrl + '/signedCustomer', {params: {
                id: $rootScope.user._id}})
                .then(function(res) {
                    $loader.stop()
                    if(res.data) {
                        $scope.classes = res.data
                        for(var i= 0; i< $scope.classes._classId.length; i++) {
                            $scope.custClasses.push(res.data._classId[i])
                        }
                    }
                }, function(err) {
                    console.log(err)
                })
        }
        
        $scope.deleteClass = function(index) {
            $loader.startBackground()
            var customer_id = $scope.classes._id
            var class_id = $scope.custClasses[index].classes._id;
            var i = confirm('Are you sure to delete this class');
            if(i) {
                $http.get(env_var.bizApiUrl + '/deleteclass', {params:{customer_id, class_id}})
                    .then(function(res) {
                        $loader.stop()
                        $scope.custClasses.splice(index,1);
                        alert('You will be refunded soon !!!')
                    }, function(err) {
                        console.log(err)
                    })
            }
        }

        $scope.goToLocal = function(c) {
            localStorage.setItem('_businessId', c._businessId._id)
            $state.go('user.locallpc', {name: c._businessId.firstname})
        }
    })