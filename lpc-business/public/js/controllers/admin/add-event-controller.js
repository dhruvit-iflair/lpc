angular.module('inspinia')

    .controller('addEventCtrl', function(toastr, $timeout, $scope, $http, $rootScope, $state, $stateParams) {
        
        $scope.eventData = {};
        $scope.editEvent = false;
        $scope.title = 'Add Offered Events';

        $scope.submit = function(eventData) {
            $scope.submitted = false;
            if(this.eventForm.$invalid) {
                $scope.submitted = true;
            } else {
                $http.post('/event', eventData)
                .then(function(res) {
                    $scope.saved = true;
                    document.getElementById('event_form').reset();
                    $scope.submitted = false;
                    $scope.success = true;
                    toastr.success('Event offered created successfully');
                    $timeout(function() {
                        $state.go('event.event-list');
                    }, 3000)
                }, function(err) {
                    toastr.error('Something went wrong', 'Error');
                    console.log(err);
                })
            }
        }

        if($stateParams.id) {
            $scope.editEvent = true;
            $scope.title = 'Edit Offered Events'
            $http.get('/event/' +$stateParams.id)
            .then(function(res) {
                $scope.eventData = res.data;
            }, function(err) {
                console.log(err);
            })
        }

        $scope.updateSuccess = false
        $scope.update = function(eventData) {
            if(this.eventForm.$invalid) {
                $scope.submitted = true;
            } else {
                $http.put('/event/' +$stateParams.id, eventData)
                    .then(function(res) {
                        $scope.saved = true;
                        $scope.submitted = false;
                        $scope.updateSuccess = true;
                        toastr.success('Event offered updated successfully');
                        $timeout(function() {
                            $state.go('event.event-list');
                            $scope.editEvent = false;
                        }, 3000)
                    }, function(err) {
                        toastr.error('Something went wrong', 'Error')
                        //console.log(err);
                    })
            }
        }

        $scope.cancel = function() {
            $state.go('event.event-list');
            $scope.editEvent = false;
        }

    })