angular.module('inspinia')
    .constant('appName', 'Topao')
    .value('userOnline', {
        firstName: 'Ishaque',
        lastName: 'Mev',
        email: 'u@me.com'
    })

    .controller('userClassCtrl', function(env_var, $transitions, userOnline, appName, $scope, $rootScope, $state, $http, $timeout) {
        
        $scope.address = $rootScope.user.street_address + ' ' + $rootScope.user.city + ' ' 
            + ' ' + $rootScope.user.zip + ', ' + $rootScope.user.state;
        
        $scope.classes = [];
        $http.get(env_var.bizApiUrl + '/class', {params: 
                {id: $rootScope.user._id}})
            .then(function(res) {
                $scope.currentDate = new Date().toISOString();
                for(var i= 0; i< res.data.length; i++) {
                    if($scope.currentDate <= res.data[i].date) {
                        $scope.classes.push(res.data[i]);
                    }
                }
                initMap()
            }, function(err) {
                $state.go('user.default')
            })

            $scope.getMiles = function(c) {
                getDistance(c)
            }

        $scope.m = []
        function getDistance(c) {
            var directionsService = new google.maps.DirectionsService;
            var request = {
                origin: $scope.address,
                destination: c._businessId.street_address + ' ' + c._businessId.city + ' ' 
                                + ' ' + c._businessId.zip + ', ' + c._businessId.state,
                travelMode  : google.maps.DirectionsTravelMode.DRIVING                           
            }
            directionsService.route(request, function(response, status) {
                if ( status == google.maps.DirectionsStatus.OK ) {
                    $timeout(function() {
                        $scope.miles = (response.routes[0].legs[0].distance.value) / 1000;
                        $scope.m.push({
                            'address': request.destination,
                            '_id': c._id,
                            'distance': Math.round(response.routes[0].legs[0].distance.value * 0.000621371) 
                        })
                    }, 0)
                }
                else {
                    // For solving overreach limit
                    $timeout(function() {
                        getDistance(c)
                    }, 0)
                }
            });
        }
    
        function initMap() {
            var latitude, longitude;
            if(navigator.geolocation) {
                var geocoder = new google.maps.Geocoder();
                for(var i= 0; i< $scope.classes.length; i++) {
                    if($scope.currentDate <= $scope.classes[i].date) { 
                        geocoder.geocode( { 'address': $scope.classes[i]._businessId.street_address + ', ' + $scope.classes[i]._businessId.city + ', ' + $scope.classes[i]._businessId.state}, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                latitude = results[0].geometry.location.lat();
                                longitude = results[0].geometry.location.lng();
                            } 
                            var origin1 = new google.maps.LatLng(latitude, longitude);
                            var destinationA = $scope.address;
                        });
                    }
                }
            }
        }

        $scope.page = ''
        $http.get(env_var.bizApiUrl + '/package')
            .then(function(res) {
                $scope.packages = res.data
            }, function(err) {
                $state.go('user.default')
            })

        $scope.classSignUp = function (c) {
            var cls = {
                'id': c._id,
                'price': c.price,
                'account_id': c._businessId.account_id
            }
            // localStorage.setItem('classSignupId', c._id )
            localStorage.setItem('classSignupId', JSON.stringify(cls))
            $state.go('user.classSignup')
        }

        $scope.goToLocal = function(c) {
            localStorage.setItem('_businessId', c._businessId._id)
            $state.go('user.locallpc', {name: c._businessId.firstname})
        }

        $scope.packageClasses = function (p) {
            localStorage.setItem('_packageClassId', p._id)
            $state.go('user.package-class');
        }

        $scope.packageSignUp = function (p) {
            localStorage.setItem('packageSignupId', p._id);
            $state.go('user.classSignup')
        }

        $transitions.onStart({}, function($transition) {
            
        })
    })