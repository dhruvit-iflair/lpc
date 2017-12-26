angular.module('inspinia')

    .controller('faqListCtrl', function($loader, env_var, DTOptionsBuilder, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        $http.get(env_var.apiUrl + '/faq')
            .then(function(res) {
                $loader.stop();
                $scope.faq = res.data;
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
                $scope.faqId = $scope.faq[index]._id;
                $http.put(env_var.apiUrl + '/faqStatus/' +$scope.faqId)
                    .then(function(res) {
                        if ($scope.faq[index].status == 'active') {
                            $scope.faq[index].status = 'inactive';
                        }
                        else{
                            $scope.faq[index].status = 'active';
                        }
                        toastr.success('FAQ' + ' ' + $scope.faq[index].status + ' ' + 'successfully' )
                        
                    }, function(err) {
                        toastr.error('Something went wrong')
                        //console.log(err);
                    })
            }

            $scope.delete = function(index) {
                $scope.faqId = $scope.faq[index]._id;
                $ngConfirm({
                    icon: 'fa fa-warning',
                    title: 'Confirm to delete!',
                    content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
                    buttons: {
                        sayBoo: {
                            text: 'Delete!',
                            btnClass: 'btn-red',
                            action: function(scope,rootScope, button) {
                                $http.delete(env_var.apiUrl + '/faq/' +$scope.faqId)
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