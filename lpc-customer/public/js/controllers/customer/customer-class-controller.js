angular.module('inspinia')
    .controller('customerClassCtrl', function($state, $scope, $rootScope, $http, toastr, $timeout) {
        
        $scope.custClasses = []
        allClasses()
        function allClasses() {
            $http.get('http://192.168.1.50:7575/signedCustomer', {params: {
                id: $rootScope.user._id}})
                .then(function(res) {
                    if(res.data) {
                        console.log(res.data)
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
            var customer_id = $scope.classes._id
            var class_id = $scope.custClasses[index].classes._id;
            var i = confirm('Are you sure to delete this class');
            if(i) {
                $http.get('http://192.168.1.50:7575/deleteclass', {params:{customer_id, class_id}})
                    .then(function(res) {
                        // console.log(res.data)
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