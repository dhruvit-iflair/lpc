angular.module('inspinia')
    .controller('businessPhotoCtrl', function(env_var, $scope, $rootScope, $http, $state) {
        
        $scope.photoData = {}

        var formData = new FormData();

        var file = document.getElementById('fileId');
        $scope.myFiles = function($files) {
            $scope.fileArray = []
            var files = file.value.split('.').pop();
            if($files.length == 0) {
                $scope.imageLength = undefined
                $scope.imageError = true;
                $scope.fileArray = []
            } else {
                for(var i= 0; i< $files.length; i++) {
                    if(['bmp', 'gif', 'jpg', 'jpeg', 'png', 'PNG'].indexOf
                        ($files[i].name.split('.').pop()) > -1) {
                            formData.delete('photos[]');
                            $scope.fileArray.push($files[i])
                            $scope.imageLength = $files.length;
                            $scope.imageError = false
                    } else {
                        $scope.fileArray = []
                        formData.delete('photos');
                        fileArray = [];
                        //document.getElementById('uploadTxt').value = '';
                        $scope.imageLength = undefined;
                        $scope.imageError = true
                        alert('Wrong choice')
                        break;
                    }
                }
            }
        }

        $scope.submit = function(photoData) {
            if(this.photoForm.$invalid) {
                $scope.submitted = true;
            } else if($scope.imageLength === undefined) {
                $scope.imageError = true
            } else {
                for (var i = $scope.fileArray.length - 1; i >= 0; i--) {
                    formData.append('photos[]', $scope.fileArray[i]);
                }
                formData.append('_businessId', $rootScope.user._id);

                $http.post(env_var.apiUrl + '/bussphoto', formData, {
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function(res) {
                        $state.go('user.home')
                    }, function(err) {
                        console.log(err)
                    })
            }
        }

        getPhotos()
        function getPhotos() {
            $http.get(env_var.apiUrl + '/bussphoto/' + $rootScope.user._id)
                .then(function(res) {
                    $scope.photos = res.data
                }, function(err) {
                    console.log(err)
                })
        }

        $scope.delete = function(index) {
            var id = $scope.photos._id
            var image = $scope.photos.photos[index];
            $http.get(env_var.apiUrl + '/deletephoto/' +id + '/' +image)
                .then(function(res) {
                    $scope.photos = res.data
                }, function(err) {
                    console.log(err)
                })
        }
    })