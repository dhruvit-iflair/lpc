/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/admin");
     
    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('index', {
            name: 'index',
            abstract: true,
            templateUrl: "views/common/content.html",
            access: {restricted: false}
        })
        .state('index.dashboard', {
            name: 'dashboard',
            url: "/admin/dashboard",
            templateUrl: "views/dashboard.html",
            access: {restricted: true, admin: true},
            controller: function($scope, $loader) {
                $loader.stop()
            }
        })
        .state('index.minor', {
            name: 'index.minor',
            url: "/admin/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' },
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
        })
        .state('business', {
            name: 'business',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
        })
        .state('service', {
            name: 'service',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
        })
        .state('service.add-service', {
            name: 'service-add-service',
            url: "/admin/service-offered-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-service.html",
            data: { pageTitle: 'Add Services' },
            controller: 'addServiceCtrl',
            access: {restricted: true, admin: true}
        })
        .state('service.service-list', {
            name: 'service-service-list',
            url: "/admin/service-offered-list",
            templateUrl: "views/admin/service-list.html",
            data: { pageTitle: 'Services List' },
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
            access: {restricted: true, admin: true}
        })
        .state('event', {
            name: 'event',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
        })
        .state('event.add-event', {
            name: 'event.add-event',
            url: "/admin/event-offered-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-event.html",
            data: { pageTitle: 'Add Event' },
            controller: 'addEventCtrl',
            access: {restricted: true, admin: true}
        })
        .state('event.event-list', {
            name: 'event.event-list',
            url: "/admin/event-offered-list",
            templateUrl: "views/admin/event-list.html",
            data: { pageTitle: 'Events List' },
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
            access: {restricted: true, admin: true}
        })
        .state('class', {
            name: 'class',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
        })
        .state('package', {
            name: 'package',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
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
            access: {restricted: true, admin: true}
        })
        .state('cms', {
            name: 'cms',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
        })
        .state('cms.add-cms', {
            name: 'cms.add-cms',
            url: "/admin/cms-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-cms.html",
            data: { pageTitle: 'Add CMS' },
            controller: 'addCMSCtrl',
            access: {restricted: true, admin: true}
        })
        .state('cms.cms-list', {
            name: 'cms.cms-list',
            url: "/admin/cms-list",
            templateUrl: "views/admin/cms-list.html",
            data: { pageTitle: 'CMS List' },
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
            controller: 'CMSListCtrl',
            access: {restricted: true, admin: true}
        })
        .state('banner', {
            name: 'banner',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
        })
        .state('banner.add-banner', {
            name: 'banner.add-banner',
            url: "/admin/banner-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-banner.html",
            data: { pageTitle: 'Add Banner' },
            controller: 'addBannerCtrl',
            access: {restricted: true, admin: true}
        })
        .state('banner.banner-list', {
            name: 'banner.banner-list',
            url: "/admin/banner-list",
            templateUrl: "views/admin/banner-list.html",
            data: { pageTitle: 'Banner List' },
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
            controller: 'bannerListCtrl',
            access: {restricted: true, admin: true}
        })
        .state('faq', {
            name: 'faq',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",

            access: {restricted: true, admin: true}
        })
        .state('faq.add-faq', {
            name: 'faq.add-faq',
            url: "/admin/faq-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-faq.html",
            data: { pageTitle: 'Add FAQ' },
            controller: 'addfaqCtrl',
            access: {restricted: true, admin: true}
        })
        .state('faq.faq-list', {
            name: 'faq.faq-list',
            url: "/admin/faq-list",
            templateUrl: "views/admin/faq-list.html",
            data: { pageTitle: 'FAQ List' },
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
            controller: 'faqListCtrl',
            access: {restricted: true, admin: true}
        })
        .state('email', {
            name: 'email',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
        })
        .state('email.add-email', {
            name: 'email.add-email',
            url: "/admin/email-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-email.html",
            data: { pageTitle: 'Add Email' },
            controller: 'addEmailCtrl',
            access: {restricted: true, admin: true}
        })
        .state('email.email-list', {
            name: 'email.email-list',
            url: "/admin/email-list",
            templateUrl: "views/admin/email-list.html",
            data: { pageTitle: 'Email List' },
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
            controller: 'emailListCtrl',
            access: {restricted: true, admin: true}
        })
        .state('blog', {
            name: 'blog',
            abstract: true,
            url: "",
            templateUrl: "views/common/content.html",
            access: {restricted: true, admin: true}
        })
        .state('blog.add-blog', {
            name: 'blog.add-blog',
            url: "/admin/blog-info/:id",
            params: {
                id: null
            },
            templateUrl: "views/admin/add-blog.html",
            data: { pageTitle: 'Add Blog' },
            controller: 'addBlogCtrl',
            access: {restricted: true, admin: true}
        })
        .state('blog.blog-list', {
            name: 'blog.blog-list',
            url: "/admin/blog-list",
            templateUrl: "views/admin/blog-list.html",
            data: { pageTitle: 'Blog List' },
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
            controller: 'blogListCtrl',
            access: {restricted: true, admin: true}
        })

        //Users
        .state('user', {
            name: 'user',
            abstract: true,
            templateUrl: "views/common/userContent.html",
            access: {restricted: false},
            cache: false
        })
        .state('user.home', {
            name: 'home',
            url: "/home",
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
        .state('compreg', {
            name: 'compreg',
            url: '/compreg',
            templateUrl: 'views/user/compreg.html',
            data: { pageTitle: 'Complete Registration' },
            access: {restricted: false},
            controller: 'registerCtrl',
            cache: false
        })
        .state('user.class', {
            name: 'class',
            url: '/class',
            templateUrl: 'views/user/class.html',
            data: { pageTitle: 'Class' },
            access: {restricted: false},
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
        .state('user.services', {
            name: 'service',
            url: '/service',
            templateUrl: 'views/user/event.html',
            data: { pageTitle: 'Service' },
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
        .state('user.blog', {
            name: 'blog',
            url: '/blog',
            templateUrl: 'views/user/event.html',
            data: { pageTitle: 'Blog' },
            access: {restricted: true},
            controller: 'homeCtrl',
            cache: false
        })
        .state('user.faq', {
            name: 'faq',
            url: '/faq',
            templateUrl: 'views/user/event.html',
            data: { pageTitle: 'FAQ' },
            access: {restricted: true},
            controller: 'homeCtrl',
            cache: false
        })
        // Updating profile
        .state('user.profile', {
            name: 'profile',
            url: '/profile',
            templateUrl: 'views/user/profile.html',
            data: { pageTitle: 'Profile' },
            access: {restricted: true},
            controller: 'profileCtrl',
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

        // business
        .state('user.buss', {
            name: 'buss',
            abstract: true,
            templateUrl: "views/common/businessContent.html",
            access: {restricted: false},
            cache: false
        })
        .state('user.buss.class', {
            name: 'class',
            url: '/business_class',
            templateUrl: 'views/business/business-class.html',
            data: { pageTitle: 'Add Class' },
            access: {restricted: true},
            controller: 'businessClassCtrl',
            cache: false
        })
        .state('user.buss.classlist', {
            name: 'classList',
            url: '/business_class_list',
            templateUrl: 'views/business/business-class-list.html',
            data: { pageTitle: 'Class List' },
            access: {restricted: true},
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
            controller: 'businessClassListCtrl',
            cache: false
        })
        .state('user.buss.package', {
            name: 'package',
            url: '/business_package',
            templateUrl: 'views/business/business-package.html',
            data: { pageTitle: 'Add Package' },
            access: {restricted: true},
            controller: 'businessPackageCtrl',
            cache: false
        })
        .state('user.buss.packagelist', {
            name: 'packageList',
            url: '/business_package_list',
            templateUrl: 'views/business/business-package-list.html',
            data: { pageTitle: 'Package List' },
            access: {restricted: true},
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
            controller: 'businessPackageListCtrl',
            cache: false
        })
        .state('user.buss.profile', {
            name: 'bussinessprofile',
            url: '/business_profile',
            templateUrl: 'views/business/business-profile.html',
            data: { pageTitle: 'Business Profile' },
            access: {restricted: true},
            controller: 'businessProfileCtrl',
            cache: false
        })
        .state('user.buss.locationlist', {
            name: 'bussinesslocationlist',
            url: '/business_location_list',
            templateUrl: 'views/business/business-location-list.html',
            data: { pageTitle: 'Location List' },
            access: {restricted: true},
            controller: 'businessLocationListCtrl',
            cache: false
        })
        .state('user.buss.location', {
            name: 'bussinesslocation',
            url: '/business_location',
            templateUrl: 'views/business/business-location.html',
            data: { pageTitle: 'Add Location' },
            access: {restricted: true},
            controller: 'businessLocationCtrl',
            cache: false
        })
        .state('user.buss.photo', {
            name: 'bussinessphoto',
            url: '/business_photo',
            templateUrl: 'views/business/business-photo.html',
            data: { pageTitle: 'Photos' },
            access: {restricted: true},
            controller: 'businessPhotoCtrl',
            cache: false
        })
        .state('user.buss.payout', {
            name: 'business_payout',
            url: '/business_payout',
            templateUrl: 'views/business/business-payout.html',
            data: { pageTitle: 'Payout' },
            access: {restricted: true},
            controller: 'businessPayoutCtrl',
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