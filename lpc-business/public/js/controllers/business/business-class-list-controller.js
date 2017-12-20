angular.module('inspinia')
    .controller('businessClassListCtrl', function($ngConfirm, $state, DTOptionsBuilder, $timeout, $scope, $rootScope, $http) {
        
        var url_string = window.location.href
        var url = new URL(url_string);
        
        if(url.search) {
            $http.get('/oauth/callback', {params: 
                {id: $rootScope.user._id, email: $rootScope.user.email}} )
                    .then(function(res) {
                        alert(res.data)
                    }, function(err) {
                        console.log(err)
                    })    
        }
        
        localStorage.removeItem('classId')

        var dates = new Date();
        $scope.selectedMonth = '';
        $scope.months = []
        $scope.m_months = []
        monthNames = [];
        for(var i= 0; i< moment.months().length; i++) {
            monthNames.push(moment.months()[i])
        }

        $scope.dtInstance = {}; 
        getData()
        function getData() {       
            $http.get('/getUserClass/' + $rootScope.user._id)
            .then(function(res) {
                $scope.class = res.data;
                $scope.dtOptions = {
                    // searching: false
                    // paging: false
                }
                
                for(var i= 0; i< $scope.class.length; i++) {

                    var aa = $scope.class.sort(sortOn('date'));
                    var bb = $scope.class.sort(sortOn('date'))
                    var a = moment(aa[i].date).toDate().getMonth() + 1;
                    var b = moment(bb[i].date).toDate().getFullYear();
                    
                    $scope.m_months.push({
                        'no': a + ' ' + moment($scope.class[i].date).toDate().getFullYear(),
                        'month': monthNames[((a) - 1)] + ' ' + moment($scope.class[i].date).toDate().getFullYear()
                    })
                    // $scope.months.push({
                    //     'no':(moment($scope.class[i].date).toDate().getMonth() + 1) + ' ' +  
                    //         moment($scope.class[i].date).toDate().getFullYear(),
                    //     'month': monthNames[moment($scope.class[i].date).toDate().getMonth()] + ' ' +
                    //                 moment($scope.class[i].date).toDate().getFullYear()
                    // })
                }

                const me = Array.from(new Set($scope.m_months.map((item) => item.no)))
                const you = Array.from(new Set($scope.m_months.map((item) => item.month)))
            
                for(var i= 0; i< me.length; i++) {
                    $scope.months.push({
                        'no': me[i],
                        'month': you[i]
                    })
                }
            
                // For sorting $scope.class date in correct order
                function sortOn(property) {
                    return function(a, b) {
                        if(a[property] < b[property]) {
                            return -1
                        } else if(a[property] > b[property]) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }

            }, function(err) {
                console.log(err)
            })
        }
        // for(var i = 0; i < 4; i++) {
        //     $scope.months.push({
        //         'no': (dates.getMonth() + 1) + ' ' + (dates.getFullYear()),
        //         'month': monthNames[dates.getMonth()] + ' ' + dates.getFullYear()
        //     });
        //     // For month++
        //     dates.setMonth(dates.getMonth() + 1, 1);
        //     // dates.setFullYear(dates.getFullYear())
        // }
        

        // Filter for ng-repeat to cope up with select box
        // $scope.selected is binded to $scope.months.no
        $scope.selectedMonthFilter = function(element) {
            if(!$scope.selectedMonth) return true;
            // element.date from selected $scope.class.date
            return (moment(element.date).toDate().getMonth() + 1 + ' ' + 
                moment(element.date).toDate().getFullYear())  == $scope.selectedMonth;
        }

        $scope.bindMe = function() {
            // $scope.dtInstance.rerender();
        }

        // For updating profile data
        $scope.editBussClass = function(c) {
            localStorage.setItem('classId', c._id);
            $state.go('user.buss.class');
        }

        $scope.delete = function(c) {
            $scope.classId = c._id; 
            $scope.className = c.business_name; 
            $ngConfirm({
            icon: 'fa fa-warning',
            title: 'Confirm to delete!',
            content: 'Are you sure to delete : <strong>{{className}}</strong> !!!',
            buttons: {
                sayBoo: {
                    text: 'Delete!',
                    btnClass: 'btn-red',
                    action: function(scope,rootScope, button) {
                        $http.delete('/class/' +$scope.classId)
                            .then(function(res) {
                                $scope.months = [];
                                getData()
                                // $state.go('.', {}, {reload: true});
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
            })
        }
    })