(function () {
    angular.module('inspinia', [
        'ui.router',                    
        'oc.lazyLoad',                 
        'ui.bootstrap',
        'cp.ngConfirm',
        'toastr',
        'ngSanitize',
        'uiRouterStyles'
    ])
    
    .run(function($transitions, $state, $rootScope, $location, $timeout) {  
        $transitions.onStart({},
          function($transition) {
            var st = $state.get()
            var auth = $transition.injector().get('AuthInterceptor');
            if(!auth.isLoggedIn()) {
                $rootScope.loggedOut = true;
                $rootScope.loggedIn = false;
                if($transition.to().access.restricted) {
                    $rootScope.restrictedAfterLogin = $transition.to().name;
                    var a = confirm('Please login to access this page');
                    if(a) {
                        $state.go('login');
                    }
                    return false;
                }
            }
            if(auth.isLoggedIn()) {
                $rootScope.loggedIn = true;
                $rootScope.loggedOut = false;
                if(($transition.to().name === 'login' || $transition.to().name === 'register')) {
                    if($rootScope.user.role_id == 0) {
                        $state.go('index.dashboard');
                    } else {
                        $state.go('user.home');
                    }
                    return false;
                } 
            }
            
            if($transition.to().name == 'compreg' && !localStorage.getItem('business')) {
                if(auth.isLoggedIn()) {
                    $state.go('user.home')
                } else {
                    alert('Please signup first')
                    $state.go('login')
                }
            }
          });
    })
    // .run(($transitions, $state) => {
    //     $transitions.onError({}, ($transition) => {
    //         console.log($transition.error());
    //         return false;
    //     })
    // })
    
    // .factory('$exceptionHandler', function($log, ErrorService) {
    //     return function(exception, cause) {
    //       if (console) {
    //         $log.error(exception);
    //         $log.error(cause);
    //       }
    //       ErrorService.send(exception, cause);
    //     };
    // })

    // .config(['$qProvider', function ($qProvider) {
    //     $qProvider.errorOnUnhandledRejections(false)
    // }]);

})();

