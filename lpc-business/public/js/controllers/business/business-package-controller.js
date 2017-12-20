angular.module('inspinia')
.controller('businessPackageCtrl', function(toastr, $ngConfirm, $state, $timeout, $scope, $rootScope, $http) {
    
    $scope.packageData = {};
    $scope.editPackage = false;
    $scope.title = 'Add Package';
    
    $scope.currentDate = new Date().toISOString();

    getClass();
    function getClass() {
        $http.get('/getUserClass/' + $rootScope.user._id)
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

        if(localStorage.getItem('packageId')) {
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

    $scope.allDates = [];
    $scope.submit = function(packageData) {

        if(this.packageForm.$invalid) {
            $scope.submitted = true
        } else if($scope._classId.length == 0){
            $scope.classError = true
        } else {
            $scope.saved = true;
            
            for(var i= 0; i< $scope.classData.length; i++) {
                for(var j= 0; j< $scope._classId.length; j++) {
                    if($scope._classId[j] == $scope.classData[i]._id) {
                        $scope.allDates.push(moment($scope.classData[i].date).toDate())
                    }
                }
            }
            var startDate = new Date(Math.min.apply(null,$scope.allDates));        
            console.log(startDate);    

            var all = {
                '_businessId': $rootScope.user._id,
                'package_name': packageData.package_name,
                'discount': packageData.discount,
                '_classId': $scope._classId,
                'start_date': startDate
            }

            $http.post('/package', all)
                .then(function(res) {
                    $scope.submitted = false
                    $scope.classError = false
                    document.getElementById('package_form').reset();
                    toastr.success('Package created successfully');
                    $timeout(function() {
                        $state.go('user.buss.packagelist')
                    }, 3000)
                    
                }, function(err) {
                    toastr.error('Something went wrong', 'Error')
                    console.log(err);
                })
        }
    }

    if(localStorage.getItem('packageId')) {
        $scope._classIdU = [];
        $scope.checkSelection = []
        $scope.editPackage = true
        $scope.packageId = localStorage.getItem('packageId')
        $http.get('/package/' + $scope.packageId)
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
                $state.go('user.buss.packagelist')
            })
    }

    $scope.update = function(packageData) {
        if(this.packageForm.$invalid) {
            $scope.submitted = true;
        } else if($scope._classIdU.length == 0) {
            $scope.classError = true;
        } else {
            $scope.saved = true;

            for(var i= 0; i< $scope.classData.length; i++) {
                for(var j= 0; j< $scope._classIdU.length; j++) {
                    if($scope._classIdU[j] == $scope.classData[i]._id) {
                        $scope.allDates.push(moment($scope.classData[i].date).toDate())
                    }
                }
            }
            var startDate = new Date(Math.min.apply(null,$scope.allDates));        
            
            var all = {
                'package_name': packageData.package_name,
                'discount': packageData.discount,
                '_classId': $scope._classIdU,
                'start_date': startDate
            }

            $http.put('/package/' +$scope.packageId, all)
                .then(function(res) {
                    $scope.submitted = false
                    $scope.classError = false
                    toastr.success('Package updated successfully');
                    $timeout(function() {
                        $state.go('user.buss.packagelist')
                        $scope.editPackage = false;
                    }, 3000)
                }, function(err) {
                    toastr.error('Something went wrong', 'Error')
                    console.log(err);
                })
        }
    }

    $scope.cancel = function() {
        localStorage.removeItem('packageId')
        $state.go('user.buss.packagelist')
    }


})