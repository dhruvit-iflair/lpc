var env = {}
if(window) {
    Object.assign(env, window.env_var);
}

(function () {
    angular.module('inspinia', [
        'ui.router',                    
        'oc.lazyLoad',                 
        'ui.bootstrap',
        'cp.ngConfirm',
        'toastr',
        'ngSanitize',
        'uiRouterStyles',
        'angularLoad',
        'angularPayments',
        'ui.carousel',
        'angular-ui-loader'
    ])

    .constant('env_var', env)
    
    .run(function($transitions, $loader, $state, $rootScope, $location, $timeout) {  
        $transitions.onStart({}, function($transition) {
            $loader.startBackground()
            var st = $state.get()
            var auth = $transition.injector().get('AuthInterceptor');
            if(!auth.isLoggedIn()) {
                $rootScope.loggedOut = true;
                $rootScope.loggedIn = false;
                if($transition.to().access.restricted) {
                    $rootScope.restrictedAfterLogin = $transition.to().name;
                    var a = confirm('Please login to access this page');
                    if(a) {
                        $timeout(function() {
                            $state.go('login');
                        })
                    }
                    return false;
                }
            }
            if(auth.isLoggedIn()) {
                $rootScope.loggedIn = true;
                $rootScope.loggedOut = false;
                if(($transition.to().name === 'login' || $transition.to().name === 'register')) {
                    $timeout(function() {
                        $state.go('user.home');
                    })
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
        })

        $transitions.onSuccess({}, function($transition) {
            // $loader.stop()
        })

        $transitions.onError({}, function($transition) {
            $loader.stop()
        })
    });
    
})();