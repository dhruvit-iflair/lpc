angular.module('inspinia')

    .controller('addClassCtrl', function(env_var, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams) {

        $scope.title = 'Add Class';
        $scope.classData = {};

        $http.get(env_var.apiUrl + '/classByUser')
        .then(function(res) {   
            $scope.businesses = [];
            for(var i= 0; i< res.data.length; i++) {
                $scope.businesses.push({
                    _id: res.data[i]._id,
                    name: res.data[i].firstname + ' ' + res.data[i].lastname
                });
            }
        })

        $scope.duplicate = [
            'None', 'Daily', 'Weekly', 'Monthly'
        ];
        $scope.every = [
            '1 Week', '2 Weeks', '3 Weeks'
        ];
        $scope.days = [
            {'id': 1, name: 'Sunday'},
            {'id': 2, name: 'Monday'},
            {'id': 3, name: 'Tuesday'},
            {'id': 4, name: 'Wednesday'},
            {'id': 5, name: 'Thursday'},
            {'id': 6, name: 'Friday'},
            {'id': 7, name: 'Saturday'}
        ]

        $scope.bindDuplicate = function(classData) {
            if(classData.duplicate == 'Weekly') {
                $scope.showWeek = true;
            } else {
                $scope.showWeek = false;
            }
        }

        $scope.checkSelected = []
        $scope.toggleDays = function(name) {
            if(!$stateParams.id) {
                $scope.daysError = false;
                var ddx = $scope.checkSelected.indexOf(name);
                if($scope.checkSelected.indexOf(name) == -1) {
                    $scope.checkSelected.push(name);
                } else {
                    $scope.checkSelected.splice(ddx, 1);
                }
                if($scope.checkSelected.length == 0) {
                    $scope.daysError = true;
                }
            }
            if($stateParams.id) {
                $scope.daysError = false;
                var ddx = $scope.checkSelection.indexOf(name);
                if($scope.checkSelection.indexOf(name) == -1) {
                    $scope.checkSelection.push(name);
                } else {
                    $scope.checkSelection.splice(ddx, 1);
                }
                if($scope.checkSelection.length == 0) {
                    $scope.daysError = true;
                }
            }
        }

        function catchMeIfYouCan(classData) {
            $scope.daysError = true;
            if(!$stateParams.id) {
                if(classData.week) {
                    $scope.options2 = {
                        'week': classData.week,
                        'day': $scope.checkSelected
                    }
                }
            }

            if($stateParams.id) {
                if(classData.week) {
                    $scope.options2 = {
                        'week': classData.week,
                        'day': $scope.checkSelection
                    }  
                } else {
                    if(($scope.showWeek == undefined || $scope.showWeek == false) && classData.duplicate != 'Weekly') {
                        $scope.options2 = {
                            'week': undefined,
                            'day': []
                        }  
                    }
                }
            }
        }
        
        $scope.submit = function(classData) {
            if(this.classForm.$invalid) {
                $scope.submitted = true;
            } 
            else if(classData.week && $scope.checkSelected.length == 0) {
                $scope.daysError = true;
            } 
            else {
                $scope.saved = true;
                var text = angular.element(document.querySelector('#summernote'))
                .summernote('code');
                //.replace(/<[^>]+>/gm, '');
                var options = {
                    '_businessId': classData._businessId,
                    'date': classData.date,
                    'time_from': classData.time_from,
                    'time_to': classData.time_to,
                    'class_name': classData.class_name,
                    'location': classData.location,
                    'copies': classData.copies,
                    'price': classData.price,
                    'duplicate': classData.duplicate,
                    'instruction': text,
                }
                catchMeIfYouCan(classData);
                var team = angular.merge(options, $scope.options2);

                $http.postenv_var.apiUrl + ('/class', options)
                    .then(function(res) {
                        document.getElementById('class_form').reset();
                        $scope.submitted = false;
                        $scope.daysError = false
                        $scope.success = true;
                        toastr.success('Class created successfully')
                        $timeout(function() {
                            $state.go('class.class-list');
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                    })
            }
        }

        if($stateParams.id) {
            $scope.checkSelection = []
            $scope.editClass = true
            $scope.title = 'Edit Class'
            $http.get(env_var.apiUrl + '/class/' +$stateParams.id)
                .then(function(res) {
                    $scope.classData = res.data;
                    $scope.selected = $scope.classData._businessId.firstname + ' ' + $scope.classData._businessId.lastname;
                    $scope.classData.date = moment(res.data.date).format('YYYY/MM/DD')
                    angular.element(document.querySelector('#summernote'))
                        .summernote('code', res.data.instruction);
                    
                    if(res.data.duplicate === 'Weekly') {
                        $scope.showWeek = true
                    }
                    // For updating checkbox
                    if(res.data.day) {
                        for(var i= 0; i< res.data.day.length; i++) {
                            $scope.checkSelection.push(res.data.day[i])
                        }
                    }
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.update = function(classData) {
            if($scope.showWeek == false || $scope.showWeek == undefined) {
                classData.week = undefined;
                $scope.checkSelection = []
            };
            if(this.classForm.$invalid) {
                $scope.submitted = true;
            } else if(classData.week && $scope.checkSelection.length == 0) {
                $scope.daysError = true
            } else {
                var text = angular.element(document.querySelector('#summernote'))
                    .summernote('code');
                var options = {
                    '_businessId': classData._businessId,
                    'date': classData.date,
                    'time_from': classData.time_from,
                    'time_to': classData.time_to,
                    'class_name': classData.class_name,
                    'location': classData.location,
                    'copies': classData.copies,
                    'price': classData.price,
                    'duplicate': classData.duplicate,
                    'instruction': text,
                }
                catchMeIfYouCan(classData);
                var team = angular.merge(options, $scope.options2);
                $http.put(env_var.apiUrl + '/class/' +$stateParams.id, options)
                    .then(function(res) {
                        $scope.saved = true
                        $scope.submitted = false;
                        $scope.daysError = false;
                        toastr.success('Class updated successfully')
                        $timeout(function() {
                            $state.go('class.class-list')
                            $scope.editClass = true;
                        }, 3000)
                        
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('class.class-list')
            $scope.editClass = false;
        }
        
    })