angular.module('inspinia')
.controller('topCtrl', function($loader, env_var, $window, AuthInterceptor, $stateParams, $window, $state, $timeout, $location, $scope, $http, $rootScope, $anchorScroll) {
    
    $http.get(env_var.bizApiUrl + '/cms').then(function(res) {
        $loader.stop()
        $scope.cms = res.data;
        $scope.cmsId = true;
    })
    var currentDate = new Date()
    top();
    
    $scope.userLogin = function() {
        $rootScope.currentPath = $state.current.name;
        $state.go('login');
    }

    $scope.dates = []
    if($rootScope.user) {
        $http.get(env_var.bizApiUrl + '/signedCustomer', {params: {
            id: $rootScope.user._id}})
            .then(function(res) {
                if(res.data != null) {
                    $scope.a = true
                    for(var i= 0; i< res.data.length; i++) {
                        if(res.data[i].classes.date > currentDate.toISOString()) {
                            $scope.dates.push({
                                'day': moment(res.data[i].classes.date).format('dddd'),
                                'date': res.data[i].classes.date,
                                'time': res.data[i].classes.time_from
                            })
                        }
                    }
                    $scope.blogPosts = $scope.dates.sort(function(a, b) {
                        return new Date(a.date) - new Date(b.date)
                    })
                } else {
                    $scope.a = false
                }
                
            }, function(err) {
                console.log(err)
            })
    }
    // if($rootScope.user) {
    //     $scope.customer = $rootScope.user.firstname + ' ' + $rootScope.user.lastname;
    // }

    $scope.logout = function() {
        AuthInterceptor.logout();
    }

    function top() {
        var el = angular.element;
        if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
            document.querySelectorAll('.header-right nav ul li a').forEach(function(c){
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
                c.click(function () {
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
})