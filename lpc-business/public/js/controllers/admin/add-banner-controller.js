angular.module('inspinia')

    .controller('addBannerCtrl', function(env_var, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams) {
        
        $scope.title = 'Add Banner';
        $scope.bannerData = {};
        $scope.imageLength;

        var formData = new FormData();
        var file = document.getElementById('fileId');

        $scope.myFiles = function($files) {
            var files = file.value.split('.').pop();
            if(!$files[0]) {
                $scope.imageLength = undefined
            } else {
                if(['bmp', 'gif', 'jpg', 'jpeg', 'png', 'PNG'].indexOf(files) > -1) {
                    formData.delete('image');	
                    formData.append('image', $files[0]);
                    $scope.imageLength = $files.length;
                    $scope.imageError = false
                } else {
                    formData.delete('image');	
                    $scope.imageLength = undefined
                }
            }
        }

        function everyThing(bannerData) {
            formData.append('title', bannerData.title)
            formData.append('description', bannerData.description);
        }

        $scope.submit = function(bannerData) {
            if(this.bannerForm.$invalid) {
                $scope.submitted = true;
            } else if($scope.imageLength === undefined) {
                $scope.imageError = true
            } else {
                $scope.submitted = false;
                $scope.imageError = false;

                everyThing(bannerData);
                $http.post(env_var.apiUrl + '/banner', formData, {
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .then(function(res) {
                    $scope.saved = true;
                    document.getElementById('banner_form').reset();
                    toastr.success('Banner created successfully');
                    $timeout(function() {
                        $state.go('banner.banner-list')
                    }, 3000)
                }, function(err) {
                    formData.forEach(function(val ,key, fd) {
                        formData.delete(key);
                    })
                    toastr.error('Something went wrong');  
                })
            }
        }

        if($stateParams.id) {
            $scope.editBanner = true;
            $scope.title = 'Edit Banner'
            $http.get(env_var.apiUrl + '/banner/' +$stateParams.id)
                .then(function(res) {
                    $scope.bannerData = res.data;
                    document.getElementById('image').src = '/upload/' + res.data.image;
                }, function(err) {
                    console.log(err)
                })
        }

        $scope.update = function(bannerData) {
            if(this.bannerForm.$invalid) {
                $scope.submitted = true;
            } else if($scope.imageLength === undefined) {
                $scope.imageError = true
            } else {
                $scope.submitted = false;
                $scope.imageError = false;

                everyThing(bannerData);
                $http.put(env_var.apiUrl + '/banner/' +$stateParams.id, formData, {
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .then(function(res) {
                    $scope.saved = true;
                    document.getElementById('banner_form').reset();
                    toastr.success('Banner updated successfully');
                    $timeout(function() {
                        $state.go('banner.banner-list');
                        $scope.editBanner = false;
                    }, 3000)
                }, function(err) {
                    formData.forEach(function(val ,key, formData) {
                        formData.delete(key);
                    })
                    toastr.error('Something went wrong');
                })
            }
        }

        $scope.cancel = function() {
            $state.go('banner.banner-list');
            $scope.editBanner = false;
        }

    })