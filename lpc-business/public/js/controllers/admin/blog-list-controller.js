angular.module('inspinia')

    .controller('blogListCtrl', function(DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        
        getblogs();        
        function getblogs() {
            $http.get('/blog')
            .then(function(res) {
                $scope.blogs = res.data;       
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lTfgitp')
                .withButtons([
                    {extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},
                    {extend: 'print',
                        customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');
        
                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]); 
            }, function(err) {
                console.log(err);
            });
        }

        $scope.updateStatus = function(index) {
            $scope.blogId = $scope.blogs[index]._id;
            $http.put('/blogStatus/' +$scope.blogId)
                .then(function(res) {
                    
                    if ($scope.blogs[index].status == 'active') {
                        $scope.blogs[index].status = 'inactive';
                    }
                    else{
                        $scope.blogs[index].status = 'active';
                    }
                    toastr.success('Blog' + ' ' + $scope.blogs[index].status + ' ' + 'successfully' )
                    
                }, function(err) {
                    alert('Something went wrong');
                    console.log(err);
                })
        }

        // Deleting a blog on blog-list state
        $scope.delete = function(index) {
            $scope.blogId = $scope.blogs[index]._id;
            
                $ngConfirm({
                    icon: 'fa fa-warning',
                    title: 'Confirm to delete!',
                    content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                    buttons: {
                        sayBoo: {
                            text: 'Delete!',
                            btnClass: 'btn-red',
                            action: function(scope,rootScope, button) {
                                $http.delete('/blog/' +$scope.blogId)
                                    .then(function(res) {
                                        $state.go('.', {}, {reload: true});
                                    }, function(err) {
                                        console.log(err);
                                    })
                            }
                        },
                        close: {
                            text: 'Close',
                            btnClass: 'btn-dark',
                            close: function(scope, button){
                            
                            }
                        }
                    }
                });
        }
        
    })