angular.module('inspinia')
.controller('topCtrl', function($loader, env_var, $window, AuthInterceptor, $stateParams, $window, $state, $timeout, $location, $scope, $http, $rootScope, $anchorScroll) {
    
    $http.get(env_var.apiUrl + '/cms').then(function(res) {
        $loader.stop()
        $scope.cms = res.data;
        $scope.cmsId = true;
    })

    topA();

    $scope.userLogin = function() {
        $rootScope.currentPath = $state.current.name;
        $state.go('login');
    }

    if($rootScope.user) {
        $scope.customer = $rootScope.user.firstname + ' ' + $rootScope.user.lastname;
    }

    $scope.logout = function() {
        AuthInterceptor.logout();
        // $window.location.reload()
    }

    function topA() {
        //$scope.nav = true;
        var el = angular.element;
        if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
            el(document.querySelector('.header-right nav ul li a')).each( function(){
                var onClick;
                var firstClick = function () {
                    onClick = secondClick;
                    return false;
                };
                var secondClick = function () {
                    onClick = firstClick;
                    return true;
                };
                onClick = firstClick;
                this.click(function () {
                    return onClick();
                });
            })
        }
        
        var div = el(document.querySelector('div')).appendTo('body');
        div.attr('class', 'mobile-menu');

        var mobile_nav = el(document.querySelector('header nav')).clone();
        mobile_nav.attr({
            class: 'sb-slidebar',
            id: 'menu'
        });

        mobile_nav.appendTo('.mobile-menu');
        el(document.querySelector('#menu')).mmenu({
            extensions: ['effect-slide-menu', 'pageshadow'],
            searchfield: false,
            counters: false,
            offCanvas: {
                position: 'right',
            }
        });

        var API = el(document.querySelector('#menu')).data('mmenu');
        el(document.querySelector('#nav-icon1')).click(function () {
            API.close();
            //$scope.nav = false;
        });
    }

    function top() {
        $(function ($) {
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                $(".header-right nav ul li a").each(function () {
                    var onClick;
                    var firstClick = function () {
                        onClick = secondClick;
                        return false;
                    };
                    var secondClick = function () {
                        onClick = firstClick;
                        return true;
                    };
                    onClick = firstClick;
                    $(this).click(function () {
                        return onClick();
                    });
                });
            }

            var $div = $('<div />').appendTo('body');
            $div.attr('class', 'mobile-menu');

            var $mobile_nav = $('header nav').clone();
            $mobile_nav.attr({
                class: 'sb-slidebar',
                id: 'menu'
            });

            $($mobile_nav).appendTo('.mobile-menu');
            $('#menu').mmenu({
                extensions: ['effect-slide-menu', 'pageshadow'],
                searchfield: false,
                counters: false,
                offCanvas: {
                    position: 'right',
                }
            });

            var API = $('#menu').data('mmenu');
            $('#nav-icon1').click(function () {
                API.close();
            });

        })
    }
})