angular.module('inspinia')
    .controller('registerCtrl', function(env_var, toastr, $stateParams, $scope, $state, $http, $location, $rootScope) {
        
        $scope.title = 'Register to LPC';
        $scope.registerData = {}
        $scope.profileData = {}

        $rootScope.services = [
            {id: 1, title: 'Holiday Classes'},
            {id: 2, title: 'Classes'}
        ]
        $rootScope.events = [
            {id: 1, title: 'Birthdays'},
        ]

        $http.get(env_var.apiUrl + '/role')
            .then(function(res) {
                $scope.role = res.data[1]._id;
            }, function(err) {
                console.log(err)
            })

        $scope.submit = function(registerData) {
            if(this.registerForm.$invalid) {
                $scope.submitted = true
            }
            else {
                $scope.submitted = false;
                console.log(registerData);
                $http.post(env_var.apiUrl + '/businessEmail', registerData)
                    .then(function(res) {
                        if(res.data === 'Email already exists') {
                            toastr.error(res.data, 'Error')
                        } else {
                            localStorage.setItem('business', JSON.stringify(registerData));
                            $state.go('compreg')
                        }
                    })                
            }
        }

        // For completing business registeration    
        var formData = new FormData();        
        $scope.services_offered = [];
        $scope.toggleService = function(title) {
            if(!$stateParams.id) {
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
        }

        var file = document.getElementById('fileId');
        $scope.myFiles = function($files) {
            console.log(file)
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

        function everyThing() {
            var reg = JSON.parse(localStorage.getItem('business'));
            formData.append('firstname', reg.firstname);
            formData.append('lastname', reg.lastname);
            formData.append('email', reg.email);
            formData.append('password', reg.password);
            formData.append('street_address', reg.street_address);
            formData.append('state', reg.state);
            formData.append('city', reg.city);
            formData.append('contact', reg.contact);
            formData.append('zip', reg.zip);
            formData.append('role_id', $scope.role);
            formData.append('services_offered[]', $scope.services_offered);
            formData.append('special_events[]', $scope.events_offered);            
        }

        $scope.profile = function(profileData) {
            if(this.profileForm.$invalid) {
                $scope.submitted = true
            } else if($scope.services_offered.length === 0) {
                $scope.serviceError = true;
            } else if($scope.events_offered.length === 0) {
                $scope.eventError = true;
            } else if($scope.imageLength === undefined) {
                $scope.imageError = true
            } else {
                everyThing();
                formData.append('business_description', profileData.business_description);

                $http.post(env_var.apiUrl + '/register', formData, {
                        headers: { 'Content-Type': undefined }
                    })
                    .then(function(res) {
                        if(res.data === 'Email already exists') {
                            toastr.error(res.data, 'Error');
                        } else {
                            document.getElementById('profile_form').reset();
                            $scope.submitted = false;
                            $scope.imageError = false
                            $scope.serviceError = false;
                            localStorage.removeItem('business')
                            alert('Successfully registered, please login now')
                            $state.go('login');
                        }
                        
                    }, function(err) {
                        console.log(err);
                        alert('Error')
                    })
            }
        }

        $scope.cancel = function() {
            localStorage.removeItem('business');
            $state.go('login')
        }
    })