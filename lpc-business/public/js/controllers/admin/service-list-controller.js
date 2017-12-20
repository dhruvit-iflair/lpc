angular.module('inspinia')

    .controller('serviceListCtrl', function(DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        
        $http.get('/service')
        .then(function(res) {
            $scope.service = res.data;
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

        $scope.status = false;
        $scope.updateStatus = function(index) {
            $scope.serviceId = $scope.service[index]._id;
            $http.get('/serviceStatus/' +$scope.serviceId)
                .then(function(res) {
                    
                    if ($scope.service[index].status == 'active') {
                        $scope.service[index].status = 'inactive';
                    }
                    else{
                        $scope.service[index].status = 'active';
                    }
                    toastr.success('Offered service' + ' ' + $scope.service[index].status + ' ' + 'successfully' )
                    
                }, function(err) {
                    alert('Something went wrong');
                    console.log(err);
                })
        }

        $scope.delete = function(index) {
            $scope.serviceId = $scope.service[index]._id;
            $ngConfirm({
                icon: 'fa fa-warning',
                title: 'Confirm to delete!',
                content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                buttons: {
                    sayBoo: {
                        text: 'Delete!',
                        btnClass: 'btn-red',
                        action: function(scope,rootScope, button) {
                            $http.delete('/service/' +$scope.serviceId)
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