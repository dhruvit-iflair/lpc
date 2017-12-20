angular
    .module('inspinia')
    
    .directive('pageTitle', function($rootScope, $timeout, $transitions) {
        return {
            link: function(scope, element) {
                var listener = function($transition) {
                    var title = 'LPC | Customer';
                    if($transition.to().data && $transition.to().data.pageTitle) title = $transition.to().data.pageTitle + ' ' + '| Le Petit Chef - Customer';
                    $timeout(function() {
                        element.text(title)
                    })
                };
                $transitions.onStart({}, listener);
            }
        }
    })
    
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