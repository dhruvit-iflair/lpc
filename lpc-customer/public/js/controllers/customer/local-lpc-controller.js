angular.module('inspinia')
	.controller('localLPCCtrl', function($timeout, $stateParams, $state, $http, $rootScope, $scope) {
        
		var id = localStorage.getItem('_businessId')
		$http.get('http://192.168.1.50:7575/users/' + id)
			.then(function(res) {
                $scope.address = res.data.street_address + ' ' + res.data.city +
                    ' ' + res.data.zip + ', ' + res.data.state;
                
                //console.log("%c" + $scope.address, "color: pink;")
				$scope.businessUser = res.data;
			}, function(err) {
				console.log(err)
            })

        $scope.classes = []
		$http.get('http://192.168.1.50:7575/classByBusiness/' + id, {
            params: {_customerId: $rootScope.user._id}
        })
			.then(function(res) {
                // $scope.classes = res.data;
                $scope.currentDate = new Date().toISOString();
                // For removing dates past current date
                for(var i= 0; i< res.data.length; i++) {
                    if($scope.currentDate <= res.data[i].date) {
                        $scope.classes.push(res.data[i])
                    }
                }
			}, function(err) {
				console.log(err)
			})

		$http.get('http://192.168.1.50:7575/bussphoto/' + id)
			.then(function(res) {
				$scope.photos = res.data;
			}, function(err) {
				console.log(err)
            })
            
        $scope.classSignUp = function (c) {
            var cls = {
                'id': c._id,
                'price': c.price,
                'account_id': c._businessId.account_id
            }
            localStorage.setItem('classSignupId', JSON.stringify(cls) )
            $state.go('user.classSignup')
        }

        $timeout(function() {
            home();
            initMap();
        }, 500)
        
        //#region Home
        function home() {    
            $(function($) {
                if ($('.classes-slider').length > 0) {
                    $('.classes-slider').slick({
                        fade: true,
                        speed: 500
                    });
                }
                if ($('.image-slider').length > 0) {
                    $('.image-slider').slick({
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        responsive: [
                            {
                                breakpoint: 641,
                                settings: {
                                    slidesToShow: 2,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]
                    });
                }
            })
        }
        //#endregion
        
        function initMap() {
            if(navigator.geolocation) {
                var uluru = {lat: -25.363, lng: 131.044};
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    center: uluru,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': $scope.address}, function(results, status) {
                    if(status == google.maps.GeocoderStatus.OK) {
                        if(status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            map.setCenter(results[0].geometry.location);
                            
                            var infowindow = new google.maps.InfoWindow(
                                { content: '<b>'+$scope.address+'</b>',
                                  size: new google.maps.Size(150,50)
                                });
                
                            var marker1 = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map, 
                                title:$scope.address
                            });
                            map.setZoom(14)
                            google.maps.event.addListener(marker1, 'click', function() {
                                infowindow.open(map,marker1);
                            });
                        } else {
                            alert('No result found')
                        }
                    } else {
                        window.location.reload()
                        // alert('Geocode wasn\'t successfull because of' + ' ' +status )
                    }
                })

            } else {
                alert('Geo Location feature is not supported in this browser.');
            }
        }
        // google.maps.event.addDomListener(window, 'load', initMap)
	})
	.filter('ashtml', function($sce) { return $sce.trustAsHtml; })