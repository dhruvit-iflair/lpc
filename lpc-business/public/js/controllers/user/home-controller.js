angular.module('inspinia')
    .controller('homeCtrl', function ($transitions, $loader, env_var, AuthInterceptor, $stateParams, $window, $state, $timeout, $location, $scope, $http, $rootScope, $anchorScroll) {
        
        $loader.stop()

        $http.get(env_var.apiUrl + '/cms').then(function(res) {
            $scope.cms = res.data;
            $scope.cmsId = true;
        });
        
        $scope.sideLast = [];
        if($rootScope.user) {
            $scope.interval = 3000;
            $http.get(env_var.apiUrl + '/getcustomerclass/' + $rootScope.user._id)
                .then(function(res) {
                    if(res.data.length != 0) {
                        $rootScope.userClass = true
                        $scope.all = res.data;
                        for(var i= 0; i< $scope.all.length; i++) {
                            $scope.sideLast.push({
                                header: 'Upcoming Classes',
                                p1: moment($scope.all[i].date).format("D MMMM YYYY"),
                                p2: $scope.all[i].time_from + ' to ' + $scope.all[i].time_to,
                                p3: $scope.all[i].class_name
                            })
                        }
                    }
                    
                }, function(err) {
                    console.log(err)
                })

            $http.get(env_var.apiUrl + '/bussphoto/' + $rootScope.user._id)
                .then(function(res) {
                    $scope.slider = res.data;
                }, function(err) {
                    console.log(err)
                })
        }

        $scope.onCarouselInit = function() {
            // console.log('carousel init');
        }
        
        if($state.current.name == 'user.home') {
            $timeout(function() {
                home()
                equalheight('equal-height')
            }, 500)    
        }
        
        function home() {   
            var testimonial = document.getElementsByClassName('testimonials-slider'); 
            var classSlider = document.getElementsByClassName('classes-slider');
            var banner = document.querySelector('.banner h1');
            var banner_title = banner.innerHTML;
            banner.setAttribute('data-content', banner_title);
            var imageContent = document.querySelectorAll('.img-content-blocks .img-block');
            
            Array.from(imageContent).forEach(function(el) {
                var content_img = el.querySelector('img').getAttribute('src');
                el.style.backgroundImage =  'url(' + content_img + ')';
            })

            if(angular.element(testimonial).length > 0) {
                angular.element(testimonial).slick({
                    autoplay: true,
                    fade: true,
                    speed: 500
                })
            }

            if(angular.element(classSlider).length > 0) {
                angular.element(classSlider).slick({
                    autoplay: true,
                    fade: true,
                    speed: 500
                })
            }
        }

        function equalheight (container) {
            var currentTallest = 0,
                currentRowStart = 0,
                rowDivs = new Array(),
                $el,
                topPosition = 0;
                
            var eh = document.querySelectorAll('.' + container);
            Array.from(eh).forEach(function(el) {
                el.height = 'auto';
                topPosition = el.style.position.top;

                if (currentRowStart != topPosition) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPosition;
                    currentTallest = el.height;
                    rowDivs.push(el);
                } else {
                    rowDivs.push(el);
                    currentTallest = (currentTallest < el.height) ? (el.height) : (currentTallest);
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height = currentTallest;
                }
            })
        }      
    })
    .filter('ashtml', function($sce) { return $sce.trustAsHtml; })