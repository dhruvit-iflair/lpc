var User = require('mongoose').model('User');
    qs = require('querystring');
    AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize',
    TOKEN_URI = 'https://connect.stripe.com/oauth/token',
    request = require('request'),
    url = require('url')
    stripe = require('stripe')('sk_test_5tOuRyslg0a37W0JI4ZswoZg')	

module.exports = function(app) {

    app.get('/authorize', function(req, res, next) {
		res.json({'url': 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_Bruzk257wJhtBEJmdYHiNUhdClYS1Rru&scope=read_write&state=abc123'})
		// res.redirect(AUTHORIZE_URI + '?' + qs.stringify({
		// 	response_type: 'code',
		// 	scope: 'read_write',
		// 	client_id: 'ca_Bruzk257wJhtBEJmdYHiNUhdClYS1Rru',
		// }))
	})

	app.get('/oauth/callback', function(req, res) {
		var url_parts = url.parse(req.headers.referer, true);
		var query = url_parts.query;
		var code = query.code;

		request.post({
		url: TOKEN_URI,
			form: {
			  grant_type: 'authorization_code',
			  client_id: 'ca_Bruzk257wJhtBEJmdYHiNUhdClYS1Rru',
			  code: code,
			  client_secret: 'sk_test_5tOuRyslg0a37W0JI4ZswoZg'
			}
		}, function(err, r, result) {
				var data = JSON.parse(result);
				// res.send(data)
				if(data.error) {
					res.send('ID has expired')
				} else {
					// res.send(data)
					// Authenticating business-user
					stripe.customers.create(
						{ email: req.query.email },
						{ stripe_account: data.stripe_user_id }
						, function(err, tem) {
							if(err) res.send(err)
							var all = {
								_businessId: req.query.id,
								email:tem.email,
								customer_id: tem.id,
								customer_account_id: data.stripe_user_id
							}
							var payout = new Payout(all)
							Payout.findOne({_businessId: req.query.id}, function(err, got) {
								if(err) res.send(err);
								if(got) {
									res.send('Already account created')
								} else {
									payout.save(function(err, pay) {
										if(err) res.json({message: 'Something went wrong' +
											' ' + ' ' + err	})
										// res.json(pay)
										User.findByIdAndUpdate({ _id: req.query.id},
											{$set: 
												{account_id: data.stripe_user_id,
												account_refresh_token: data.refresh_token}
											}, {new: true}, function(err, doc) {
												if(err) res.send(err);
											}
										)
									})
								}
							})
					}				
				);
             }

		  	});
    });
    
    // Get all charges detail created by platform
    app.get('/getChargeList', function(req, res, next) {
        stripe.charges.list(
            { limit: 3 },
            function(err, charges) {
              if(err) res.send(err);
              res.send(charges)
            }
          );
        
    })
    // Get a particular charge detail
    app.get('/getChargeById', function(req, res, next) {
        stripe.charges.retrieve(
            "ch_1BWi9KC5kpWZbIVOttDx0S2J",
            function(err, charge) {
              if(err) res.send(err);
              res.send(charge)
            }
        );
	})
	
	app.post('/deleteAccount', function(req, res, next) {
		User.findOne({_id: req.body.id}, function(err, docs) {
			if(err) res.send('Something went wrong')	
			else {
				if(docs.account_id) {
					request.post({
						url: 'https://connect.stripe.com/oauth/deauthorize',
						formData: {
							client_id: 'ca_Bruzk257wJhtBEJmdYHiNUhdClYS1Rru',
							stripe_user_id: docs.account_id,
						},
						headers: {'Authorization': 'Bearer sk_test_5tOuRyslg0a37W0JI4ZswoZg'},
					}, function(err, r, result) {
						var data = JSON.parse(result);
						if(data.error) {
							res.send('The account does not exists')
						}
						if(data.stripe_user_id) {
							User.update({account_id: data.stripe_user_id}, 
								{$unset: {account_id: 1, account_refresh_token: 1}
								}, {multi: true}, function(err, account) {
								if(err) res.send(err);
								else {
									Payout.remove({customer_account_id: data.stripe_user_id},
										function(err, doc) {
											if(err) res.send(err);
										})	
								}
							})	
						}
					})
				}
			}
		})
		
	})

	app.get('/getpayoutbyId', function(req, res) {
		Payout.findOne({_businessId: req.query.id}, function(err, result) {
			if(err) {
				res.sendStatus(500); 
				return;
			}
			result ? res.sendStatus(200) : res.sendStatus(404)
		})
	})
}
