angular.module('inspinia')

    .controller('businessClassCtrl', function($loader, env_var, AuthInterceptor, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams) {
        $loader.stop();
        $scope.classData = {};
        $scope.address = []
        var currentDate = new Date();

        $http.get(env_var.apiUrl + '/getAddressByUser/' +$rootScope.user._id)
            .then(function(res) {
                for(var i= 0; i< res.data.length; i++) {
                    $scope.address.push({
                        'id': res.data[i]._id,
                        'address': res.data[i].address
                    })
                }
            }, function(err) {
                alert('Something went wrong while accessing addresses')
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

            if(localStorage.getItem('classId')) {
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
            if(localStorage.getItem('classId')) {
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

        
        $scope.checkDate = function(classData) {
            $scope.dateError = false
            if(classData.date != undefined) {
                if(currentDate >= new Date(classData.date)) {
                    $scope.dateError = true
                }
            }
        }

        $scope.submit = function(classData) {
            if(this.classForm.$invalid) {
                $scope.submitted = true;
            } else if(currentDate >= new Date(classData.date)) {
                $scope.dateError = true
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
                    '_businessId': $rootScope.user._id,
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
                $http.post(env_var.apiUrl + '/class', options)
                    .then(function(res) {
                        document.getElementById('class_form').reset();
                        $scope.submitted = false;
                        $scope.daysError = false
                        $scope.success = true;
                        toastr.success('Class created successfully')
                        $timeout(function() {
                            $state.go('user.buss.classlist')
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                    })
            }
        }

        if(localStorage.getItem('classId')) {
            $scope.checkSelection = []
            $scope.editClass = true
            $scope.classId = localStorage.getItem('classId')
            $http.get(env_var.apiUrl + '/class/' + $scope.classId)
                .then(function(res) {
                    $scope.classData = res.data;
                    $scope.classData.date = moment(res.data.date).format('YYYY/MM/DD')
                    angular.element(document.querySelector('#summernote'))
                        .summernote('code', res.data.instruction);
                    if(res.data.duplicate === 'Weekly') {
                        $scope.showWeek = true
                    }
                    if(res.data.day) {
                        for(var i= 0; i< res.data.day.length; i++) {
                            $scope.checkSelection.push(res.data.day[i])
                        }
                    }
                    
                }, function(err) {
                    $state.go('user.buss.classlist')
                })
        }

        $scope.update = function(classData) {
            if($scope.showWeek == false || $scope.showWeek == undefined) {
                classData.week = undefined;
                $scope.checkSelection = []
            };
            if(this.classForm.$invalid) {
                $scope.submitted = true
            } else if(classData.week && $scope.checkSelection.length == 0) {
                $scope.daysError = true;
                console.log($scope.checkSelection)
            } else {
                var text = angular.element(document.querySelector('#summernote'))
                    .summernote('code');
                var options = {
                    //'_businessId': classData._businessId,
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
                $http.put(env_var.apiUrl + '/class/' +$scope.classId, options)
                    .then(function(res) {
                        $scope.saved = true
                        $scope.submitted = false;
                        $scope.daysError = false;
                        toastr.success('Class updated successfully')
                        $timeout(function() {
                            $state.go('user.buss.classlist')
                            $scope.editClass = true;
                        }, 3000)
                        localStorage.removeItem('classId')
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('user.buss.classlist')
            $scope.editClass = false;
            localStorage.removeItem('classId')
        }
        
    })
