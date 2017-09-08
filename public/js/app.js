(function () {
    angular.module('inspinia', [
        'ui.router',                    
        'oc.lazyLoad',                 
        'ui.bootstrap',
        'cp.ngConfirm',
        'toastr'
    ])

    .run( function($transitions, $state, $rootScope, $location) {
        
        $transitions.onStart({},
          function($transition) {
            var auth = $transition.injector().get('AuthService');
            auth.getUserStatus()
                .then(function() {
                    // if($rootScope.userStatus == false) {
                    //     $rootScope.lout = false;
                    //     $rootScope.lin = true;
                    // } else {
                    //     $rootScope.lin = false;
                    //     $rootScope.lout = true;
                    // }

                    if($transition.to().access.restricted && !auth.isLoggedIn()) {
                        $state.go('login')
                        return false;
                    } else if($transition.to().name === 'login' && auth.isLoggedIn()) {
                        var fromState = $transition.from().name
                        $state.go(fromState);
                        return false;
                        //return $transition.router.stateService.target('login');
                    } 
                    //else if(!$transition.to().access.restricted && auth.isLoggedIn()) {
                    //     $state.go($rootScope.stateName);
                    //     return false;
                    // }
                })
          })
    })

})();

