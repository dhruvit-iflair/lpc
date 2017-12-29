angular.module('inspinia')
    .controller('businessProfileCtrl', function($window, AuthInterceptor, $loader, env_var, toastr, $ngConfirm, $state, $timeout, $scope, $rootScope, $http) {
        
        var id = $rootScope.user._id;
        $scope.profileData = {};
        $rootScope.services = [
            {id: 1, title: 'Holiday Classes'},
            {id: 2, title: 'Classes'}
        ]
        $rootScope.events = [
            {id: 1, title: 'Birthdays'},
        ]
        
        $http.get(env_var.apiUrl + '/users/' + id)
            .then(function(res) {
                $loader.stop()
                if(res.data.role_id.title == 'business') {
                    $scope.business = true;
                }
                $scope.profileData = res.data;
                $scope.profileData.password = null;
                $scope.events_offered = res.data.special_events;
                $scope.services_offered = res.data.services_offered
            }, function(err) {
                console.log(err)
            })
        
        $scope.services_offered = [];
        $scope.toggleService = function(title) {
            $scope.serviceError = false;
            var sdx = $scope.services_offered.indexOf(title);
            if($scope.services_offered.indexOf(title) == -1) {
                $scope.services_offered.push(title)
            } else {
                $scope.services_offered.splice(sdx, 1);
            }
            if($scope.services_offered.length == 0) {
                $scope.serviceError = true;
                formData.delete('services_offered[]');
            }
        }
    
        var formData = new FormData();
        $scope.events_offered = [];
        $scope.toggleEvent = function(title) {
            $scope.eventError = false;
            var tdx = $scope.events_offered.indexOf(title);
            if($scope.events_offered.indexOf(title) == -1) {
                $scope.events_offered.push(title);
            } else {
                $scope.events_offered.splice(tdx, 1);
            }
            console.log($scope.events_offered)
            if($scope.events_offered.length == 0) {
                $scope.eventError = true;
                formData.delete('special_events[]');
            }    
        }

        var file = document.getElementById('fileId');
        $scope.myFiles = function($files) {
            var files = file.value.split('.').pop();
            if(!$files[0]) {
                $scope.imageLength = undefined;
            } 
            else {
                if(['bmp', 'gif', 'jpg', 'jpeg', 'png', 'PNG'].indexOf(files) > -1) {
                    formData.delete('cover_photo');	
                    formData.append('cover_photo', $files[0]);
                    $scope.imageLength = $files.length;
                } else {
                    formData.delete('cover_photo');	
                    document.getElementById('uploadTxt').value = '';
                    $scope.imageLength = undefined;
                }
            }
        }

        function everyThing(profileData) {
            formData.append('firstname', profileData.firstname);
            formData.append('lastname', profileData.lastname);
            formData.append('email', profileData.email);
            formData.append('password', profileData.password);
            formData.append('street_address', profileData.street_address);
            formData.append('state', profileData.state);
            formData.append('city', profileData.city);
            formData.append('contact', profileData.contact);
            formData.append('zip', profileData.zip);
            formData.append('business_description', profileData.business_description);
        }

        $scope.submit = function(profileData) {
            if(this.profileForm.$invalid) {
                $scope.submitted = true
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

                everyThing(profileData);
                $http.put(env_var.apiUrl + '/users/' +id, formData, {
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function(res) {
                        $scope.saved = true;
                        $scope.services_offered = [];
                        $scope.submitted = false;
                        document.getElementById('profile_form').reset();
                        toastr.success('Data updated successfully');
                        
                        var payload;
                        AuthInterceptor.saveToken(res.data.token);
                        $rootScope.logData = AuthInterceptor.getToken();
                        payload = $rootScope.logData.split('.')[1];
                        payload = $window.atob(payload);
                        payload = JSON.parse(payload);

                        $timeout(function() {
                            $state.go('user.home');
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
            $state.go('user.home')
        }
    })