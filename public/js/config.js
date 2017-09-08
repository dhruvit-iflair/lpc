/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/admin");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            name: 'index',
            abstract: true,
            //url: "/admin",
            templateUrl: "views/common/content.html",
            access: {restricted: true}
        })
        .state('index.dashboard', {
            name: 'index.dashboard',
            url: "/admin/dashboard",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Example view' },
            access: {restricted: true}
        })
        .state('index.minor', {
            name: 'index.minor',
            url: "/admin/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' },
            access: {restricted: true}
        })
        .state('login', {
            name: 'login',
            url: "/admin",
            templateUrl: "views/admin/login.html",
            data: { pageTitle: 'Login' },
            controller: 'loginCtrl',
            access: {restricted: false}
        })
        .state('customer', {
            name: 'customer',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true}
        })
        .state('customer.add-customer', {
            name: 'customer.add-customer',
            url: "/admin/customer-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-customer.html",
            data: { pageTitle: 'Add Customer' },
            controller: 'addCustomerCtrl',
            access: {restricted: true}
        })
        .state('customer.customer-list', {
            name: 'customer.customer-list',
            url: "/admin/customer-list",
            templateUrl: "views/admin/customer-list.html",
            data: { pageTitle: 'Customer List' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            },
            controller: 'customerListCtrl',
            access: {restricted: true}
        })
        .state('business', {
            name: 'business',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true}
        })
        .state('business.add-business', {
            name: 'business.add-business',
            url: "/admin/business-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-business.html",
            data: { pageTitle: 'Add Business' },
            controller: 'addBusinessCtrl',
            access: {restricted: true}
        })
        .state('business.business-list', {
            name: 'business.business-list',
            url: "/admin/business-list",
            templateUrl: "views/admin/business-list.html",
            data: { pageTitle: 'Business List' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            },
            controller: 'businessListCtrl',
            access: {restricted: true}
        })
        .state('service', {
            name: 'service',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true}
        })
        .state('service.add-service', {
            name: 'service-add-service',
            url: "/admin/service-offered-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-service.html",
            data: { pageTitle: 'Add Offered Services' },
            controller: 'addServiceCtrl',
            access: {restricted: true}
        })
        .state('service.service-list', {
            name: 'service-service-list',
            url: "/admin/service-offered-list",
            templateUrl: "views/admin/service-list.html",
            data: { pageTitle: 'Offered Services List' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            },
            controller: 'serviceListCtrl',
            access: {restricted: true}
        })
        .state('event', {
            name: 'event',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true}
        })
        .state('event.add-event', {
            name: 'event.add-event',
            url: "/admin/event-offered-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-event.html",
            data: { pageTitle: 'Add Offered Event' },
            controller: 'addEventCtrl',
            access: {restricted: true}
        })
        .state('event.event-list', {
            name: 'event.event-list',
            url: "/admin/event-offered-list",
            templateUrl: "views/admin/event-list.html",
            data: { pageTitle: 'Offered Events List' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            },
            controller: 'eventListCtrl',
            access: {restricted: true}
        })
        .state('class', {
            name: 'class',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true}
        })
        .state('class.add-class', {
            name: 'class.add-class',
            url: "/admin/class-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-class.html",
            data: { pageTitle: 'Add Class' },
            controller: 'addClassCtrl',
            access: {restricted: true}
        })
        .state('class.class-list', {
            name: 'class.class-list',
            url: "/admin/class-list",
            templateUrl: "views/admin/class-list.html",
            data: { pageTitle: 'Class List' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            },
            controller: 'classListCtrl',
            access: {restricted: true}
        })
        .state('package', {
            name: 'package',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true}
        })
        .state('package.add-package', {
            name: 'package.add-package',
            url: "/admin/package-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-package.html",
            data: { pageTitle: 'Add Package' },
            controller: 'addPackageCtrl',
            access: {restricted: true}
        })
        .state('package.package-list', {
            name: 'package.package-list',
            url: "/admin/package-list",
            templateUrl: "views/admin/package-list.html",
            data: { pageTitle: 'Package List' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            },
            controller: 'packageListCtrl',
            access: {restricted: true}
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
    });
    

    
