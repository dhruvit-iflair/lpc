angular.module('inspinia')
    .controller('addCMSCtrl', function($transition$, toastr, $timeout, $stateParams, $scope, $rootScope, $state, $http) {
        var to = $transition$.to();
        $scope.title = 'Edit CMS'
        if($stateParams.id) {
            //$scope.editCMS = true
            $http.get('/cms/' +$stateParams.id)
                .then(function(res) {
                    $scope.cmsData = res.data;
                    angular.element(document.querySelector('#summernote'))
                        .summernote('code', res.data.description);
                })
        }

        $scope.update = function(cmsData) {
            if(this.cmsForm.$invalid) {
                $scope.submitted = true
            } else {
                $scope.saved = true;
                var text = angular.element(document.querySelector('#summernote'))
                    .summernote('code');
                
                var option = {
                    'description': text
                }
                angular.merge(cmsData, option)

                $http.put('/cms/' +$stateParams.id, cmsData)
                    .then(function(res) {
                        $scope.submitted = false;
                        document.getElementById('cms_form').reset();
                        toastr.success('CMS page updated successfully');
                        $timeout(function() {
                            $state.go('cms.cms-list')
                           // $scope.editCMS = false
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error');
                        console.log(err);
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('cms.cms-list')   
        }
    })