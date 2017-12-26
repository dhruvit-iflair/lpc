angular.module('inspinia')

    .controller('addPackageCtrl', function($loader, env_var, toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams, $ngConfirm) {
        $loader.stop()
        $scope.packageData = {};
        $scope.editPackage = false;
        $scope.title = 'Add Package';
        
        getClass();
        function getClass() {
            $http.get(env_var.apiUrl + '/class')
                .then(function(res) {
                    $scope.classData = [];
                    $scope.classDataId = [];
                    for(var i= 0; i< res.data.length; i++) {
                        $scope.classData.push(res.data[i]);
                    }
            })
        }

        $scope._classId = [];
        $scope.toggleClass = function(id) {
            if(!$stateParams.id) {
                $scope.classError = false;
                var cdx = $scope._classId.indexOf(id);
                if($scope._classId.indexOf(id) == -1) {
                    $scope._classId.push(id)
                } else {
                    $scope._classId.splice(cdx, 1);
                }
                if($scope._classId.length == 0) {
                    $scope.classError = true;
                }
            }
            
            if($stateParams.id) {
                $scope.classError = false;
                var cdx = $scope._classIdU.indexOf(id);
                if($scope._classIdU.indexOf(id) == -1) {
                    $scope._classIdU.push(id)
                } else {
                    $scope._classIdU.splice(cdx, 1);
                }
                if($scope._classIdU.length == 0) {
                    $scope.classError = true;
                }
            }
        }
        
        $scope.submit = function(packageData) {
            if(this.packageForm.$invalid) {
                $scope.submitted = true
            } else if($scope._classId.length == 0){
                $scope.classError = true
            } else {
                $scope.saved = true;
                var all = {
                    'package_name': packageData.package_name,
                    'discount': packageData.discount,
                    '_classId': $scope._classId
                }

                $http.post(env_var.apiUrl + '/package', all)
                    .then(function(res) {
                        $scope.submitted = false
                        $scope.classError = false
                        document.getElementById('package_form').reset();
                        toastr.success('Package created successfully');
                        $timeout(function() {
                            $state.go('package.package-list')
                        }, 3000)
                        
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                        console.log(err);
                    })
            }
        }

        if($stateParams.id) {
            $scope._classIdU = [];
            $scope.title = 'Edit Package'
            $scope.editPackage = true;
            $http.get(env_var.apiUrl + '/package/' +$stateParams.id)
                .then(function(res) {
                    $scope.classsData = [];
                    $scope.packageData = res.data;
                    for(var i= 0; i< res.data._classId.length; i++) {
                        $scope.classsData.push(res.data._classId[i]._id)
                    }
                    if(res.data._classId) {
                        for(var i= 0; i< res.data._classId.length; i++) {
                            $scope._classIdU.push(res.data._classId[i]._id)
                        }
                    }
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.update = function(packageData) {
            if(this.packageForm.$invalid) {
                $scope.submitted = true;
            } else if($scope._classIdU.length == 0) {
                $scope.classError = true;
            } else {
                $scope.saved = true;
                var all = {
                    'package_name': packageData.package_name,
                    'discount': packageData.discount,
                    '_classId': $scope._classIdU
                }

                $http.put(env_var.apiUrl + '/package/' +$stateParams.id, all)
                    .then(function(res) {
                        $scope.submitted = false
                        $scope.classError = false
                        toastr.success('Package updated successfully');
                        $timeout(function() {
                            $state.go('package.package-list')
                            $scope.editPackage = false;
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                        console.log(err);
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('package.package-list')
        }

    })