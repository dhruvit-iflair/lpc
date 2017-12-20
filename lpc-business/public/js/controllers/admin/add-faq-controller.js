angular.module('inspinia')
.controller('addfaqCtrl', function(toastr, $timeout, $stateParams, $scope, $rootScope, $state, $http) {
    
    $scope.title = 'Add FAQ';
    $scope.faqData = {};
    $scope.editFAQ = false;

    $scope.type = [
        'Customer', 'Business'
    ]

    $scope.submit = function(faqData) {
        if(this.faqForm.$invalid) {
            $scope.submitted = true;
        } else {
            $scope.submitted = false;

            $http.post('/faq', faqData)
                .then(function(res) {
                    $scope.saved = true;
                    document.getElementById('faq_form').reset();
                    toastr.success('FAQ created successfully');
                    $timeout(function() {
                        $state.go('faq.faq-list')
                    }, 3000)
                }, function(err) {
                    toastr.error('Something went wrong');  
                })
        }
    }

    if($stateParams.id) {
        $scope.editFAQ = true;
        $scope.title = 'Edit FAQ'
        $http.get('/faq/' +$stateParams.id)
            .then(function(res) {
                $scope.faqData = res.data;
            }, function(err) {
                console.log(err)
            })
    }

    $scope.update = function(faqData) {
        if(this.faqForm.$invalid) {
            $scope.submitted = true;
        } else {
            $scope.submitted = false;

            $http.put('/faq/' +$stateParams.id, faqData)
                .then(function(res) {
                    $scope.saved = true;
                    document.getElementById('faq_form').reset();
                    toastr.success('FAQ updated successfully');
                    $timeout(function() {
                        $state.go('faq.faq-list')
                        $scope.editFAQ = false;
                    }, 3000)
                }, function(err) {
                    toastr.error('Something went wrong');
                })
        }
    }

    $scope.cancel = function() {
        $scope.editFAQ = false;
        $state.go('faq.faq-list')
    }
})