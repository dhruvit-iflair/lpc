angular.module('inspinia')
    .controller('CMSListCtrl', function($loader, env_var, DTOptionsBuilder, toastr, $scope, $rootScope, $state, $http) {
        
        getCMS();        
        function getCMS() {
            $http.get(env_var.apiUrl + '/cms')
            .then(function(res) {
                $loader.stop()
                $scope.cms = res.data;       
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
            $scope.cmsId = $scope.cms[index]._id;
            $http.put(env_var.apiUrl + '/cmsStatus/' +$scope.cmsId)
                .then(function(res) {
                    
                    if ($scope.cms[index].status == 'active') {
                        $scope.cms[index].status = 'inactive';
                    }
                    else{
                        $scope.cms[index].status = 'active';
                    }
                    toastr.success('CMS page' + ' ' + $scope.cms[index].status + ' ' + 'successfully' )
                    
                }, function(err) {
                    toastr.error('Something went wrong', 'Error');
                    console.log(err);
                })
        }

    })