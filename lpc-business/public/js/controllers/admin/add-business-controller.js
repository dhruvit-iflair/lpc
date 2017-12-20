angular.module('inspinia')

    .controller('addBusinessCtrl', function(toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams) {
        
        $scope.title = 'Add Business';
        $scope.imageLength;
        $rootScope.services = [
            {id: 1, title: 'Holiday Classes'},
            {id: 2, title: 'Classes'}
        ]
        $rootScope.events = [
            {id: 1, title: 'Birthdays'},
        ]

        var formData = new FormData();
        var file = document.getElementById('fileId');
        
        $scope.myFiles = function($files) {
            var files = file.value.split('.').pop();
            if(!$files[0]) {
                $scope.imageLength = undefined;
            } else {
                if(['bmp', 'gif', 'jpg', 'jpeg', 'png', 'PNG'].indexOf(files) > -1) {
                    formData.delete('cover_photo');	
                    formData.append('cover_photo', $files[0]);
                    $scope.imageLength = $files.length;
                } else {
                    formData.delete('cover_photo');	
                    //document.getElementById('uploadTxt').value = '';
                    $scope.imageLength = undefined;
                }
            }
        }

        if($stateParams.id) {
            $http.get('/users/' +$stateParams.id)
                .then(function(res) {
                    $scope.events_offering = res.data.special_events;
                    $scope.services_offering = res.data.services_offered
                })
        }

        $scope.services_offered = [];
        $scope.toggleSelection = function(title) {
            if(!$stateParams.id) {
                $scope.serviceError = false;
                var tdx = $scope.services_offered.indexOf(title);
                if($scope.services_offered.indexOf(title) == -1) {
                    $scope.services_offered.push(title);
                } else {
                    $scope.services_offered.splice(tdx, 1);
                }
                if($scope.services_offered.length == 0) {
                    $scope.serviceError = true;
                    formData.delete('services_offered[]');
                }    
            }
            
            if($stateParams.id) {
                $scope.serviceError = false;
                $scope.services_offering = $scope.businessData.services_offered;
                var tdx = $scope.services_offering.indexOf(title);
                if($scope.services_offering.indexOf(title) == -1) {
                    $scope.services_offering.push(title);
                } else {
                    $scope.services_offering.splice(tdx, 1);
                }
                if($scope.services_offering.length == 0) {
                    $scope.serviceError = true;
                    formData.delete('services_offered[]');
                }
            }
        }

        $scope.events_offered = [];
        $scope.toggleEvent = function(title) {
            if(!$stateParams.id) {
                $scope.eventError = false;
                var tdx = $scope.events_offered.indexOf(title);
                if($scope.events_offered.indexOf(title) == -1) {
                    $scope.events_offered.push(title);
                } else {
                    $scope.events_offered.splice(tdx, 1);
                }
                if($scope.events_offered.length == 0) {
                    $scope.eventError = true;
                    formData.delete('special_events[]');
                }    
            }
            
            if($stateParams.id) {
                $scope.eventError = false;
                var tdx = $scope.events_offering.indexOf(title);
                if($scope.events_offering.indexOf(title) == -1) {
                    $scope.events_offering.push(title);
                } else {
                    $scope.events_offering.splice(tdx, 1);
                }
                if($scope.events_offering.length == 0) {
                    $scope.eventError = true;
                    formData.delete('special_events[]');
                }
                console.log($scope.events_offering)
            }
        }

        // Binding everything remaining with formdata
        function everyThing(businessData) {
            formData.append('firstname', businessData.firstname);
            formData.append('lastname', businessData.lastname);
            formData.append('email', businessData.email);
            formData.append('password', businessData.password);
            formData.append('street_address', businessData.street_address);
            formData.append('state', businessData.state);
            formData.append('city', businessData.city);
            formData.append('contact', businessData.contact);
            formData.append('zip', businessData.zip);
            formData.append('business_description', businessData.business_description);
        }
        
        $scope.success = false
        $scope.businessData = {};
        $scope.submit = function(businessData) {

            if(this.businessForm.$invalid) {
                $scope.submitted = true;
            } else if($scope.services_offered.length == 0) {
                $scope.serviceError = true;
            } else if($scope.events_offered.length == 0) {
                $scope.eventError = true;
            } else if($scope.imageLength === undefined) {
                $scope.imageError = true
            } else {

                for (var i = $scope.services_offered.length - 1; i >= 0; i--) {
                    formData.append('services_offered[]', $scope.services_offered[i]);
                }
                for (var i = $scope.events_offered.length - 1; i >= 0; i--) {
                    formData.append('special_events[]', $scope.events_offered[i]);
                }

                everyThing(businessData);                
                $http.post('/business', formData, {
                    headers: {
                        'Content-Type': undefined
                        }
                    })
                    .then(function(res) {
                        $scope.saved = true;
                        document.getElementById('business_form').reset();
                        $scope.submitted = false;
                        $scope.imageError = false
                        $scope.serviceError = false
                        $scope.success = true
                        toastr.success('Business created successfully')
                        $timeout(function() {
                            $state.go('business.business-list');
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                        //console.log(err);
                    })
            }
        }

        if($stateParams.id) {
            $scope.editBusiness = true;
            $scope.title = 'Edit Business'
            $http.get('/users/' +$stateParams.id)
                .then(function(res) {
                    $scope.businessData = res.data;
                    // console.log(res.data.services_offered);
                    document.getElementById('image').src = '/upload/' + res.data.cover_photo
                    $scope.businessData.password = null;
                }, function(err) {
                    formData.forEach(function(val ,key, fd) {
                        formData.delete(key);
                    })
                })
        }

        $scope.updateSuccess = false
        $scope.update = function(businessData) {
           
            if(this.businessForm.$invalid) {
                $scope.submitted = true
            } else if($scope.services_offering.length == 0) {
                $scope.serviceError = true;
            } else if($scope.events_offering.length == 0) {
                $scope.eventError = true;
            } else if($scope.imageLength === undefined) {
                $scope.imageError = true
            }
            else {
                for (var i = $scope.services_offering.length - 1; i >= 0; i--) {
                    formData.append('services_offered[]', $scope.services_offering[i]);
                }
                for (var i = $scope.events_offering.length - 1; i >= 0; i--) {
                    formData.append('special_events[]', $scope.events_offering[i]);
                }
                   
                everyThing(businessData);
                $http.put('/users/' +$stateParams.id, formData, {
                    headers: {
                        'Content-Type': undefined
                        }
                    })
                    .then(function(res) {
                        $scope.saved = true;
                        $scope.services_offered = [];
                        $scope.submitted = false;
                        document.getElementById('business_form').reset();
                        $scope.updateSuccess = true
                        toastr.success('Business updated successfully')
                        $timeout(function() {
                            $state.go('business.business-list');
                            $scope.editBusiness = false;
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                        formData.forEach(function(val ,key, fd) {
                            formData.delete(key);
                        })
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('business.business-list');
            $scope.editBusiness = false;
        }

    })