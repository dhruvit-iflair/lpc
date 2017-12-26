function pageTitle($rootScope, $timeout, $transitions) {
    return {
        link: function(scope, element) {
            var listener = function($transition) {
                var title = 'LPC | Business';
                if($transition.to().data && $transition.to().data.pageTitle) title = $transition.to().data.pageTitle + ' ' + '| Le Petit Chef - Business';
                $timeout(function() {
                    element.text(title)
                })
            };
            $transitions.onStart({}, listener);
        }
    }
}
/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();

            });

            // Colapse menu in mobile mode after click on element
            var menuElement = $('#side-menu a:not([href$="\\#"])');
            menuElement.click(function(){
                if ($(window).width() < 769) {
                    $("body").toggleClass("mini-navbar");
                }
            });

            // Enable initial fixed sidebar
            if ($("body").hasClass('fixed-sidebar')) {
                var sidebar = element.parent();
                sidebar.slimScroll({
                    height: '100%',
                    railOpacity: 0.9,
                });
            }
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.children('.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.children('.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}


/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)

    .directive('numberLength', function() {
        return {
          require: 'ngModel',
          link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
              var transformedInput = text.replace(/[^0-9]/g, '');
              if(transformedInput !== text) {
                  ngModelCtrl.$setViewValue(transformedInput);
                  ngModelCtrl.$render();
              }
              return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
          }
        }; 
    })

    .directive('letterLength', function() {
        return {
          require: 'ngModel',
          link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
              var transformedInput = text.replace(/[^a-zA-Z]/g, '');
              if(transformedInput !== text) {
                  ngModelCtrl.$setViewValue(transformedInput);
                  ngModelCtrl.$render();
              }
              return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
          }
        }; 
    })

    .directive('searchBox', function($compile) {
        return {
            restrict: 'AE',
            scope: {
              myDirectiveVar: '='
            },
            template: `
                <div class="navbar-header">
                    <span minimaliza-sidebar></span>
                    <form role="search" class="navbar-form-custom">
                        <div class="form-group">
                            <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search" ng-model="myDirectiveVar">
                        </div>
                    </form>
                </div>
            `
        }
    })

    .directive('fileModel', ['$parse', function($parse) {
        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.fileModel);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        };
        return {
            link: fn_link
        }
    }])

    // Directives for datepair and timepicker
    .directive('timePicker', function(){
        return {
            link: function(scope, element, attr) {
                element.timepicker({
                    'showDuration': true,
                    'timeFormat': 'g:ia'
                })
            }
        }
    })

    .directive('datePair', function() {
        return {
            link: function(scope, element) {
                element.datepair();
            }
        }
    })

    .directive('datePicker', function() {
        return {
            link: function(scope, element) {
               
                element.datepicker({
                    format: 'yyyy/mm/dd',
                    autoclose: true,
                    minDate: new Date()
                    // startDate: new Date()
                });
            }
        }
    })

    .directive('summerNote', function() {
        return {
            restrict: 'AE',
            link: function(scope, element) {
                element.summernote({
                    height: 300,
                    minHeight: null,
                    maxHeight: null
                });
            }
        }
    })

    .directive('ngConfirmClick', function($ngConfirm) {
        return {
            restrict: 'AE',
            scope: {
                setFn: '&'
            },
            link: function(scope, element, attr) {
                var msg = attr.ngConfirmClick || 'Are you sure?';
                var clickAction = attr.ngClick;
                scope.callMe = function() {
                    $ngConfirm({
                        icon: 'fa fa-warning',
                        title: 'Confirm to delete!',
                        content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                        animationBounce: 2.5, 
                        buttons: {
                            sayBoo: {
                                text: 'Delete!',
                                btnClass: 'btn-red',
                                action: function(scope, rootScope, button){ 
                                    element.bind('click', function(event) {
                                        scope.$eval(clickAction);                                       
                                    })
                                }
                            },
                            close: {
                                text: 'Close',
                                btnClass: 'btn-dark',
                                close: function(scope, button){
                                }
                            },
                         
                        }
                    });
                }
                scope.setFn({theDirFn: scope.callMe});
            }
        }
    })

