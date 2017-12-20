function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/login");
  
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('login', {
            name: 'login',
            url: "/login",
            templateUrl: "views/user/login.html",
            data: { pageTitle: 'Login' },
            controller: 'loginCtrl',
            access: {restricted: false}
        })
        
        //Users
        .state('user', {
            name: 'user',
            abstract: true,
            templateUrl: "views/common/content.html",
            access: {restricted: false},
            cache: false
        })
        .state('user.default', {
            name: 'default',
            url: "/default",
            templateUrl: "views/user/home.html",
            data: { pageTitle: 'Home' },
            access: {restricted: false},
            controller: 'homeCtrl',
            cache: false
        })
        .state('user.about', {
            name: 'about',
            url: "/about",
            params: {
                title: null
            },
            templateUrl: "views/user/cms.html",
            data: { pageTitle: 'About', specialClass: 'landing-page' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/wow/wow.min.js']
                        }
                    ]);
                }
            },
            access: {restricted: false},
            controller: 'cmsCtrl',
            cache: false
        })
        .state('user.contact', {
            name: 'contact',
            url: "/contact",
            params: {
                title: null
            },
            templateUrl: "views/user/cms.html",
            data: { pageTitle: 'Contact', specialClass: 'landing-page' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/wow/wow.min.js']
                        }
                    ]);
                }
            },
            access: {restricted: false},
            controller: 'cmsCtrl',
            cache: false
        })
        .state('register', {
            name: 'register',
            url: '/register',
            templateUrl: 'views/user/register.html',
            data: { pageTitle: 'Register' },
            access: {restricted: false},
            controller: 'registerCtrl',
            cache: false
        })
        .state('user.class', {
            name: 'class',
            url: '/class',
            templateUrl: 'views/user/class.html',
            data: { pageTitle: 'Class' },
            access: {restricted: true},
            controller: 'userClassCtrl',
            cache: false
        })
        .state('user.event', {
            name: 'event',
            url: '/event',
            templateUrl: 'views/user/event.html',
            data: { pageTitle: 'Event' },
            access: {restricted: true},
            controller: 'homeCtrl',
            cache: false
        })
        .state('user.store', {
            name: 'store',
            url: '/store',
            templateUrl: 'views/user/event.html',
            data: { pageTitle: 'Store' },
            access: {restricted: true},
            controller: 'homeCtrl',
            cache: false
        })
        .state('user.classSignup', {
            name: 'customerclassSignup',
            url: '/customer_class_signup',
            templateUrl: 'views/user/customer_class_signup.html',
            data: { pageTitle: 'Class Signup' },
            access: {restricted: true},
            controller: 'customerClassSignupCtrl',
            cache: false
        })
        .state('user.classSignup2', {
            name: 'customerclassSignup2',
            url: '/customer_class_signup_2',
            templateUrl: 'views/user/customer_class_signup2.html',
            data: { pageTitle: 'Class Signup 2' },
            access: {restricted: true},
            controller: 'customerClassSignup2Ctrl',
            cache: false
        })
        .state('user.package-class', {
            name: 'package-class',
            url: '/package-classes',
            templateUrl: 'views/user/package-classes.html',
            data: { pageTitle: 'Package' },
            access: {restricted: true},
            controller: 'userPackageClassesCtrl',
            cache: false
        })
        
        // customer
        .state('user.cust', {
            name: 'cust',
            abstract: true,
            templateUrl: "views/common/customerContent.html",
            access: {restricted: false},
            cache: false
        })
        .state('user.cust.class', {
            name: 'cust_class',
            url: '/customer_class',
            templateUrl: 'views/customer/customer_class.html',
            data: { pageTitle: 'Customer Class ' },
            access: {restricted: true},
            controller: 'customerClassCtrl',
            cache: false
        })
        .state('user.cust.profile', {
            name: 'customerprofile',
            url: '/customer_profile',
            templateUrl: 'views/customer/customer_profile.html',
            data: { pageTitle: 'Profile' },
            access: {restricted: true},
            controller: 'customerProfileCtrl',
            cache: false
        })
        .state('user.cust.kid', {
            name: 'customerkid',
            url: '/customer_kid',
            templateUrl: 'views/customer/customer_kid.html',
            data: { pageTitle: 'Add kid' },
            access: {restricted: true},
            controller: 'customerKidCtrl',
            cache: false
        })
        .state('user.cust.kidlist', {
            name: 'customerkidlist',
            url: '/customer_kid_list',
            templateUrl: 'views/customer/customer_kid_list.html',
            data: { pageTitle: 'Kids L                                                                                  ist' },
            access: {restricted: true},
            controller: 'customerKidListCtrl',
            cache: false
        })
        .state('user.locallpc', {
            name: 'locallpc',
            url: '/local_lpc/:name',
            params: {
                name: null
            },
            templateUrl: 'views/customer/local-lpc.html',
            data: { pageTitle: 'Local' },
            access: {restricted: true},
            controller: 'localLPCCtrl',
            cache: false
        })
        .state('user.payment', {
            name: 'payment',
            url: '/add_payment_method',
            templateUrl: 'views/customer/add-payment.html',
            data: { pageTitle: 'Add Payment Method' },
            access: {restricted: true},
            controller: 'paymentCtrl',
            cache: false
        })      
        .state('user.paymentlist', {
            name: 'paymentlist',
            url: '/payment_method_list',
            templateUrl: 'views/customer/payment-list.html',
            data: { pageTitle: 'Payments List' },
            access: {restricted: true},
            // controller: 'paymentCtrl',
            cache: false
        })
        $locationProvider.html5Mode(true)
}

angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    })

    .config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },  
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: true,
            tapToDismiss: true,
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 3000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });
    })

    .config(function($httpProvider) {
        $httpProvider.interceptors.push(function($q, $location, $window) {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};
                    if($window.localStorage['mean-token']) {
                        config.headers['x-access-token'] = $window.localStorage['mean-token'];
                    }
                    return config;
                },
                'responseError': function(res) {
                    if(res.status === 401 || res.status === 403) {
                        $location.path('/admin')
                    }
                    return $q.reject(res);
                }
            }
        })
    })

    // .config(function(stripeProvider) {
    //     stripeProvider.setPublishableKey('pk_test_WJtbVCYgAug1F2FLBetlecXq');
    // })