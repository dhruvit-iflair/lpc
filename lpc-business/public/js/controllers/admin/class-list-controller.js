angular.module('inspinia')

    .controller('classListCtrl', function($loader, env_var, DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        
        $http.get(env_var.apiUrl + '/class')
            .then(function(res) {
                $loader.stop();
                $scope.class = res.data;
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
                console.log(err)
            })

        $scope.updateStatus = function(index) {
            $scope.classId = $scope.class[index]._id;
            $http.get(env_var.apiUrl + '/classStatus/' +$scope.classId)
                .then(function(res) {
                    
                    if ($scope.class[index].status == 'active') {
                        $scope.class[index].status = 'inactive';
                    }
                    else{
                        $scope.class[index].status = 'active';
                    }
                    toastr.success('Class' + ' ' + $scope.class[index].status + ' ' + 'successfully' )
                  
                }, function(err) {
                    alert('Something went wrong');
                    console.log(err);
                })
        }

        $scope.setDirectiveFn = function(directiveFn) {
            $scope.directiveFn = directiveFn;
        }
        
        $scope.delete = function(index) {
            $scope.classId = $scope.class[index]._id; 
            $scope.className = $scope.class[index].business_name; 

            $ngConfirm({
            icon: 'fa fa-warning',
            title: 'Confirm to delete!',
            content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
            buttons: {
                sayBoo: {
                    text: 'Delete!',
                    btnClass: 'btn-red',
                    action: function(scope,rootScope, button) {
                        $http.delete(env_var.apiUrl + '/class/' +$scope.classId)
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