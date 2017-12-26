angular.module('inspinia')
    .controller('homeCtrl', function ($loader, env_var, AuthInterceptor, $stateParams, $window, $state, $timeout, $location, $scope, $http, $rootScope, $anchorScroll) {
        
        $http.get(env_var.bizApiUrl + '/cms').then(function(res) {
            $loader.stop()
            $scope.cms = res.data;
            $scope.cmsId = true;
        })

        if($state.current.name == 'user.default') {
            $timeout(function() {
                home()
                equalheight('equal-height')
            })
        }
        
        $scope.onCarouselInit = function() {
            // console.log('carousel init');
        }

        $scope.interval = 3000;
        $scope.slides = [
            {
                image: '/img/1.png'
            }, {
                image: '/img/2.png'
            }, {
                image: '/img/3.png'
            }, {
                image: '/img/intro-bg.jpg'
            }
        ]
        $scope.length = $scope.slides.length

        $scope.sideLast = [
            {
                header:'Upcoming Classes',
                p1: '6 Aug 2017',
                p2: '4:00pm to 5:15pm',
                p3: 'Growing Chefs (5-10y/o)'
            },
            {
                header:'Upcoming Classes',
                p1: '8 Aug 2017',
                p2: '6:00pm to 10:15pm',
                p3: 'Growing Chefs (5-10y/o)'
            }
        ]

        function home() {    
            var banner_title = document.querySelector('.banner h1')
            banner_title.setAttribute('data-content', banner_title)
            
            var imageContent = document.querySelectorAll('.img-content-blocks .img-block')
            Array.from(imageContent).forEach(function(el) {
                var content_img = el.querySelector('img').getAttribute('src');
                el.style.backgroundImage =  'url(' + content_img + ')';
            })

            var testimonial = document.getElementsByClassName('testimonials-slider'); 
            if(angular.element(testimonial).length > 0) {
                angular.element(testimonial).slick({
                    autoplay: true,
                    fade: true,
                    speed: 500
                })
            }

            var classSlider = document.getElementsByClassName('classes-slider');
            if(angular.element(classSlider).length > 0) {
                angular.element(classSlider).slick({
                    autoplay: true,
                    fade: true,
                    speed: 500
                })
            }
            // window.addEventListener('resize orientationchange', function() {
            //     document.querySelector('.image-slider').slick('resize')
            // })
            
            // window.addEventListener('resize', function() {
            //     document.querySelector('.image-slider').slick('resize')
            // });
            
            // window.addEventListener('orientationchange', function() {
            //     document.querySelector('.image-slider').slick('resize')
            // });
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