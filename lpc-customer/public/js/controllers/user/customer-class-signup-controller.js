angular.module('inspinia')
    .controller('customerClassSignupCtrl', function($scope, $state, $rootScope, $http) {
        
        localStorage.removeItem('addKid')
        // localStorage.removeItem('signup2')
        $scope.terms = false
        $scope.price;
        
        var id = JSON.parse(localStorage.getItem('classSignupId'));
        if(localStorage.getItem('classSignupId')) {
            $scope.price = id.price;
            $http.get('http://192.168.1.50:7575/class/' + id.id)
                .then(function(res) {
                    $scope.class = res.data
                }, function(err) {
                    console.log(err)
                })    
            
            $http.get('/getKidByUser/' + $rootScope.user._id)
                .then(function(res) {
                    $scope.kids = res.data
                    $scope.k = 0;
                }, function(err) {
                    console.log(err)
                })

        } else if(localStorage.getItem('packageSignupId')) {
            var id = localStorage.getItem('packageSignupId');
            console.log(id)
        } else {
            $state.go('user.class')
        }

        $scope.goToKids = function() {
            localStorage.setItem('addKid', true);
            $state.go('user.cust.kid');
        }

        $scope.kidSelected = [];
        $scope.toggleKids = function(a) {
            $scope.kidsError = false
            var kdx = $scope.kidSelected.indexOf(a);
            if($scope.kidSelected.indexOf(a) == -1) {
                $scope.kidSelected.push(a)
            } else {
                $scope.kidSelected.splice(kdx, 1)
            }
            if($scope.kidSelected.length == 0) {
                $scope.kidsError = true;
                $scope.price = id.price
            } else {
                $scope.price = parseFloat(id.price) * parseFloat($scope.kidSelected.length)
            }
        }

        $scope.payUser = [
            //'Jason\'\s visa', 'Liz\'\s visa'
            // {'id': 1, 'name': 'Jason\'\s visa'},
            // {'id': 2, 'name': 'Liz\'\s visa'}
        ]

        $scope.selected = $scope.payUser[0];
        $scope.getMe = function(s) {
            $scope.selected = s
        }

        $scope.goTo = function() {
            // var args = JSON.parse(localStorage.getItem("classSignupId"));
            // args["price"] = $scope.price;
            // localStorage.setItem("classSignupId", JSON.stringify(args));            

            if($scope.kidSelected.length == 0) {
                $scope.kidsError = true
            } else if($scope.terms == false ) {
                $scope.termError = true
            } else {
                var all = {
                    'select': $scope.selected,
                    'check': $scope.kidSelected,
                }
                $scope.kidsError = false;
                $scope.termError = false;
                localStorage.setItem('signup2', JSON.stringify(all));
                $state.go('user.classSignup2')
            }
        }

    })