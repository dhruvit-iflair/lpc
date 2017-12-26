angular.module('inspinia')
    .controller('addEmailCtrl', function($loader, env_var, $transition$, toastr, $timeout, $stateParams, $scope, $rootScope, $state, $http) {
        
        $loader.stop()
        if($stateParams.id) {
            $scope.editEmail = true
            $http.get(env_var.apiUrl + '/email/' +$stateParams.id)
                .then(function(res) {
                    $scope.emailData = res.data;
                    angular.element(document.querySelector('#content_summernote'))
                        .summernote('code', res.data.content);
                    angular.element(document.querySelector('#adminContent_summernote'))
                        .summernote('code', res.data.admin_content);
                })
        }

        $scope.update = function(emailData) {
            if(this.emailForm.$invalid) {
                $scope.submitted = true
            } else {
                $scope.saved = true;
                var text1 = angular.element(document.querySelector('#content_summernote'))
                    .summernote('code');

                var text2 = angular.element(document.querySelector('#adminContent_summernote'))
                    .summernote('code');
                
                var option = {
                    'content': text1,
                    'admin_content': text2
                }
                angular.merge(emailData, option)

                $http.put(env_var.apiUrl + '/email/' +$stateParams.id, emailData)
                    .then(function(res) {
                        $scope.submitted = false;
                        document.getElementById('email_form').reset();
                        toastr.success('Email updated successfully');
                        $timeout(function() {
                            $state.go('email.email-list')
                            $scope.editEmail = false
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error');
                        console.log(err);
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('email.email-list')
            $scope.editEmail = false
        }
})