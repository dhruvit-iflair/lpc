angular.module('inspinia')
    .controller('paymentCtrl', function($timeout, $stateParams, $state, $http, $rootScope, $scope) {

		var stripe = Stripe('pk_test_WJtbVCYgAug1F2FLBetlecXq');
		var elements = stripe.elements();
		$scope.addCard = false
		$scope.inp = {}
		$scope.inpa = {}
		var style = {
			base: {
				fontFamily: 'Arial, sans-serif',
				color: '#303238',
				fontSize: '16px',
				fontSmoothing: 'antialiased',
				'::placeholder': {
				color: '#ccc',
				},
			},
			invalid: {
				color: '#e5424d',
				':focus': {
				color: '#303238',
				},
			},
		};

		var card = elements.create('card', {style: style});
		getMe()
		function getMe() {
			$scope.show = false;
			$http.get('http://192.168.1.50:7575/paymentListById/' + $rootScope.user._id)
			.then(function(res) {
				if(res.data.status == '404') {
					$scope.show = false;
					card.mount('#card-element')
				} else {
					$scope.show = true;
					card.mount('#card-element')
					$scope.customerCards = res.data;
				}
			}, function(err) {
				console.log(err)
			})
		}

		card.addEventListener('change', function(event) {
			var displayError = document.getElementById('card-errors');
			if (event.error) {
				displayError.textContent = event.error.message;
				displayError.style.color = 'red'
			} else {
				displayError.textContent = '';
			}
		});
		
		var kids = []
		var classId = JSON.parse(localStorage.getItem('classSignupId'));
		var signup2 = JSON.parse(localStorage.getItem('signup2'));
		$scope.save = function(inp) {
			if(this.payForm.$invalid) {
				alert('Please fill all the details')
			} else {
				var extraDetails = {
					name: document.querySelector('input[name=cardholder-name]').value
				};
				stripe.createToken(card, extraDetails)
					.then(function(result) {
						if(result.error) {
							alert(result.error.message)
						} else {
							for(var i= 0; i< signup2.check.length; i++) {
								kids.push(signup2.check[i])
							}	
							if(inp.checked == false) {
								var data = {
									amount: classId.price,
									currency: 'usd',
									metadata: {
										_customerId: $rootScope.user._id,
										_classId: classId.id
									},
									receipt_email: $rootScope.user.email,
									source: result.token.id,
									application_fee: Math.round((classId.price * 1.5) / 100),
									stripe_account: classId.account_id,
								}
							
								$http.post('http://192.168.1.50:7575/charge', data, {params: {kids}})
									.then(function(res) {
										if(res.data) {
											alert(res.data)
											$state.go('user.class')
										}
									}, function(err) {
										console.log(err)
									})
							} else if(inp.checked == true) {
								var data = {
									amount: classId.price,
									currency: 'usd',
									metadata: {
										_customerId: $rootScope.user._id,
										_classId: classId.id
									},
									email: $rootScope.user.email,
									source: result.token.id,
									application_fee: Math.round((classId.price * 1.5) / 100),
									stripe_account: classId.account_id
								}
								$http.post('http://192.168.1.50:7575/savePayment', data, {params: {kids}})
									.then(function(res) {
										if(res.data) {
											alert(res.data)
											$state.go('user.class')
										}
									}, function(err) {
										console.log(err)
									})
							}	
						}
					})
			}				
		}

		$scope.savedCard = function(c) {
			var data = {
				amount: classId.price,
				currency: 'usd',
				customer: c.customer_card_id,
				metadata: {
					_customerId: c._customerId,
					email: c.email,
					_classId: classId.id
				},
				application_fee: Math.round((classId.price * 1.5) / 100),
				stripe_account: classId.account_id
			}
			for(var i= 0; i< signup2.check.length; i++) {
				kids.push(signup2.check[i])
			}
			
			$http.post('http://192.168.1.50:7575/chargeSavedCard', data, {params: {kids}})
				.then(function(res) {
					if(res.data) {
						alert(res.data)
						$state.go('user.class')
					}
				}, function(err) {
					console.log(err)
				})
		}

		$scope.removeCard = function (cards) {
			$http.delete('http://192.168.1.50:7575/deleteCard/' + cards._id)
				.then(function(res) {
					getMe()
					console.log(res.data)
				}, function(err) {
					console.log(err)
				})
		}

		// $scope.useAnother = function(selected) {

		// }

    })