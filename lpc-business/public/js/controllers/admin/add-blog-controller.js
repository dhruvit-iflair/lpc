angular.module('inspinia')

    .controller('addBlogCtrl', function(toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams) {
        
        $scope.title = 'Add Blog';
        $scope.blogData = {};
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

        function everyThing(blogData) {
            formData.append('title', blogData.title)
            formData.append('description', blogData.description);
        }

        $scope.submit = function(blogData) {
            if(this.blogForm.$invalid) {
                $scope.submitted = true;
            } else if($scope.imageLength === undefined) {
                $scope.imageError = true
            } else {
                $scope.submitted = false;
                $scope.imageError = false;

                everyThing(blogData);
                $http.post('/blog', formData, {
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .then(function(res) {
                    $scope.saved = true;
                    document.getElementById('blog_form').reset();
                    toastr.success('Blog created successfully');
                    $timeout(function() {
                        $state.go('blog.blog-list')
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
            $scope.editblog = true;
            $scope.title = 'Edit blog'
            $http.get('/blog/' +$stateParams.id)
                .then(function(res) {
                    $scope.blogData = res.data;
                    document.getElementById('image').src = '/upload/' + res.data.image;
                }, function(err) {
                    console.log(err)
                })
        }

        $scope.update = function(blogData) {
            if(this.blogForm.$invalid) {
                $scope.submitted = true;
            } else if($scope.imageLength === undefined) {
                $scope.imageError = true
            } else {
                $scope.submitted = false;
                $scope.imageError = false;

                everyThing(blogData);
                $http.put('/blog/' +$stateParams.id, formData, {
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .then(function(res) {
                    $scope.saved = true;
                    document.getElementById('blog_form').reset();
                    toastr.success('Blog updated successfully');
                    $timeout(function() {
                        $state.go('blog.blog-list')
                        $scope.editblog = false;
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
            $state.go('blog.blog-list');
            $scope.editblog = false;
        }

    })