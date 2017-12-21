angular.module('inspinia')

    .controller('eventListCtrl', function(env_var, DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        
        $http.get(env_var.apiUrl + '/event')
        .then(function(res) {
            $scope.event = res.data;
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
            $scope.eventId = $scope.event[index]._id;
            $http.get(env_var.apiUrl + '/eventStatus/' +$scope.eventId)
                .then(function(res) {
                    
                    if ($scope.event[index].status == 'active') {
                        $scope.event[index].status = 'inactive';
                    }
                    else{
                        $scope.event[index].status = 'active';
                    }
                    toastr.success('Offered event' + ' ' + $scope.event[index].status + ' ' + 'successfully' )
                    
                }, function(err) {
                    alert('Something went wrong');
                    console.log(err);
                })
        }

        $scope.delete = function(index) {
            $scope.eventId = $scope.event[index]._id;
            $ngConfirm({
                icon: 'fa fa-warning',
                title: 'Confirm to delete!',
                content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                buttons: {
                    sayBoo: {
                        text: 'Delete!',
                        btnClass: 'btn-red',
                        action: function(scope,rootScope, button) {
                            $http.delete(env_var.apiUrl + '/event/' +$scope.eventId)
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