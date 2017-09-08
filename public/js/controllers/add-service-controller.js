angular.module('inspinia')

    .controller('addServiceCtrl', function(toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams) {
        
        $scope.serviceData = {};
        $scope.editService = false;
        $scope.title = 'Add Offered Services';

        $scope.submit = function(serviceData) {
            $scope.submitted = false;
            if(this.serviceForm.$invalid) {
                $scope.submitted = true;
            } else {
                $http.post('/service', serviceData)
                .then(function(res) {
                    $scope.saved = true;
                    document.getElementById('service_form').reset();
                    $scope.submitted = false;
                    toastr.success('Service created successfully')
                    $timeout(function() {
                        $state.go('service.service-list');
                    }, 3000)
                }, function(err) {
                    toastr.error('Something went wrong', 'Error')
                    //console.log(err);
                })
            }
        }

        if($stateParams.id) {
            $scope.editService = true;
            $scope.title = 'Edit Offered Service'
            $http.get('/service/' +$stateParams.id)
            .then(function(res) {
                $scope.serviceData = res.data;
            }, function(err) {
                console.log(err);
            })
        }

        $scope.updateSuccess = false
        $scope.update = function(serviceData) {
            if(this.serviceForm.$invalid) {
                $scope.submitted = true;
            } else {
                $http.put('/service/' +$stateParams.id, serviceData)
                    .then(function(res) {
                        $scope.saved = true;
                        $scope.submitted = false;
                        $scope.editService = false;
                        toastr.success('Service updated successfully')
                        $timeout(function() {
                            $state.go('service.service-list');
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                        //console.log(err);
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('service.service-list');
            $scope.editService = false;
        }

    })