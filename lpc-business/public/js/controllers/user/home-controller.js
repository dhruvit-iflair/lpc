angular.module('inspinia')
    .controller('homeCtrl', function (AuthInterceptor, $stateParams, $window, $state, $timeout, $location, $scope, $http, $rootScope, $anchorScroll) {
        
        $http.get('/cms').then(function(res) {
            $scope.cms = res.data;
            $scope.cmsId = true;
        })

        if($rootScope.user) {
            $http.get('/bussphoto/' + $rootScope.user._id)
            .then(function(res) {
                $scope.slider = res.data
            }, function(err) {
                console.log(err)
            })
        }
        
        $timeout(function() {
            home()
            equalheight('equal-height')
        })
        

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

        $scope.middle = [
            {
                header: "Testimonials",
                para: "When I get older, I will be stronger, dey call me freedom just like a wavin' flag and den it goes back..and den it goes back.. and den it goes back...",
                author: "Anonymous"
            },
            {
                header: "Important",
                para: "When I get older, I will be older, dey won't give me freedom just like a wavin' flag and den it goes back..and den it goes back.. and den it goes back...",
                author: "Mr. Robot"
            }
        ]


        function home() {    
            $(function($) {
                var banner_title = $('.banner h1').text();
                $('.banner h1').attr('data-content', banner_title);
    
                /* Image content */
                $('.img-content-blocks .img-block').each(function () {
                    var content_img = $(this).find('img').attr('src');
                    $(this).css('background-image', 'url(' + content_img + ')');
                });
    
                /* testimonials-slider slider script */
                if ($('.testimonials-slider').length > 0) {
                    $('.testimonials-slider').slick({
                        autoplay: true,
                        fade: true,
                        speed: 500,
                        //adaptiveHeight: true
                    });
                }
    
                /* classes-slider script */
                if ($('.classes-slider').length > 0) {
                    $('.classes-slider').slick({
                        //autoplay: true,
                        fade: true,
                        speed: 500,
                        //adaptiveHeight: true
                    });
                }
    
                /* image-slider */
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

        function equalheight (container) {

            var currentTallest = 0,
                currentRowStart = 0,
                rowDivs = new Array(),
                $el,
                topPosition = 0;
            jQuery(container).each(function () {
        
                $el = jQuery(this);
                jQuery($el).height('auto')
                topPostion = $el.position().top;
        
                if (currentRowStart != topPostion) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPostion;
                    currentTallest = $el.height();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
            });
        }
            
        
    })
    .filter('ashtml', function($sce) { return $sce.trustAsHtml; })