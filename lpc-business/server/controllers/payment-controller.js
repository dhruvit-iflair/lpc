var mongoose = require('mongoose'),
    Payment = require('../models/payment-model.js'),
    Saved_customer = require('../models/saved_customer-model.js'),
    CustomerSignedClasses = require('../models/customer-signed-classes-model.js'),
    stripe = require('stripe')('sk_test_5tOuRyslg0a37W0JI4ZswoZg')
    
exports.saveUserCard = function(req, res, next) {
    var payment = new Payment(req.body);        
    payment.save(function(err, result) {
        if(err) return next(err);
        res.json(result)
    })
}

exports.getAllUserDetails = function(req, res, next) {
    Payment.find({}, function(err, result) {
        if(err) return next(err);
        res.json(result)
    })
}

// For storing charged data in payment collection
var storeCharge = function(charge) {
    return({
        _customerId: charge.metadata._customerId,
        _classId: charge.metadata._classId,
        application_id: charge.application,
        application_fee_id: charge.application_fee,
        amount: charge.amount,
        brand: charge.source.brand,
        card_id: charge.source.id, 
        charge_id: charge.id,
        country: charge.source.country,
        created_at: charge.created,
        currency: charge.currency,
        exp_month: charge.source.exp_month,
        exp_year: charge.source.exp_year,
        email: charge.receipt_email,
        funding: charge.source.funding,
        last4: charge.source.last4,
        name: charge.source.name,
        transaction_id: charge.balance_transaction,
        // customer_card_id: charge.id
    })
}

// Saving signed-up classes in table
function saveSignedClass(req, res) {
    CustomerSignedClasses.findOne(
        {_customerId: req.body.metadata._customerId},
        function(err, csd) {
            if(err) res.send(err);
            if(!csd) {
                var cscd = new CustomerSignedClasses();
                cscd._customerId = req.body.metadata._customerId;
                cscd._classId.push({
                    classes : req.body.metadata._classId,
                    kids: req.query.kids
                })
                cscd.save(function(err, cs) {
                    if(err) console.log(err);
                    res.send('Payment accepted successfully')
                })
            } else {
                csd._classId.push({
                    classes : req.body.metadata._classId,
                    kids: req.query.kids,
                })
                CustomerSignedClasses.findByIdAndUpdate(
                    {_id: csd._id}, csd, {new: true},
                    function(err, csd1) {
                        if(err) res.send(err);
                        res.send('Payment accepted successfully')
                    })
            }
    })
}

// First time charge without saving card
exports.charge = function(req, res, next) {
    var newCharge = {
        amount: req.body.amount,
        currency: req.body.currency,
        metadata: req.body.metadata,
        source: req.body.source,
        receipt_email: req.body.receipt_email,
        application_fee: req.body.application_fee
    }
    // console.log(newCharge)

    stripe.charges.create(newCharge, {
        stripe_account: req.body.stripe_account,
    }, function(err, charge) {
        if(err) {
            res.json({error: err, charge: false})
        } else {
            var payment = new Payment(storeCharge(charge))
            payment.customer_card_id = null;
            payment.save(function(err, result) {
                if(err) return next(err)
                // res.send('Payment accepted successfully')
            }).then(function() {
                saveSignedClass(req, res)
            })
        }
    })
}

// Charging card and storing information 
exports.savePayment = function(req, res, next) {
    stripe.customers.create(
        { email: req.body.email, 
          source: req.body.source, 
          metadata: req.body.metadata
        })
        .then(function(customer) {
                // res.send(customer)
                var data = {
                    _customerId: customer.metadata._customerId,
                    created_at: customer.created,
                    email: customer.email,
                    customer_card_id: customer.id,
                    object: customer.object,
                    card_id: customer.sources.data[0].id,
                    brand: customer.sources.data[0].brand,
                    country: customer.sources.data[0].country,
                    exp_month: customer.sources.data[0].exp_month,
                    exp_year: customer.sources.data[0].exp_year,
                    funding: customer.sources.data[0].funding,
                    last4: customer.sources.data[0].last4,
                    name: customer.sources.data[0].name
                }
                
                var savedCustomer = new Saved_customer(data);
                savedCustomer.save(function(err, docs) {
                    if(err) res.send(err);
                })
                // res.send(customer)
                stripe.tokens.create({
                    customer: customer.id }, {
                    stripe_account: req.body.stripe_account
                }).then(function(result) {
                    var newCharge = {
                        amount: req.body.amount,
                        currency: req.body.currency,
                        metadata: req.body.metadata,
                        source: result.id,
                        application_fee: req.body.application_fee                    
                    }
                    stripe.charges.create(newCharge, {
                        stripe_account: req.body.stripe_account
                    }, function(err, charge) {
                        if(err) {
                            res.json({error: err, charge: false})
                        } else {
                            var payment = new Payment(storeCharge(charge))
                            payment.email = customer.email;
                            payment.customer_card_id = customer.id
                            payment.save(function(err, result) {
                                if(err) return next(err)
                            }).then(function() {
                                saveSignedClass(req, res)
                            })
                        }
                    })
                })
    })
}

// Charging from stored card
exports.chargeSavedCard = function(req, res, next) {
    stripe.tokens.create({
        customer: req.body.customer }, {
        stripe_account: req.body.stripe_account
    })
        .then(function(result) {
            var newCharge = {
                amount: req.body.amount,
                currency: req.body.currency,
                metadata: req.body.metadata,
                // customer: req.body.customer,
                application_fee: req.body.application_fee,
                source: result.id
            }
            stripe.charges.create(newCharge,  {
                stripe_account: req.body.stripe_account
            }, 
            function(err, charge) {
                // res.send(charge)
                if(err) {
                    res.json({error: err, charge: false})
                } else {
                    var payment = new Payment(storeCharge(charge))
                    payment.email = charge.metadata.email;
                    payment.customer_card_id = req.body.customer
                    payment.save(function(err, result) {
                        if(err) res.send(err);
                        // res.json(result)
                    }).then(function() {
                        saveSignedClass(req, res)
                    })
                }
            });
        })
}

// Only store customer card info
exports.createCardOnly = function(req, res, next) {
    stripe.create.customers({source: req.body.source}, function(err, doc) {
        if(err) res.send(err);
        res.send(doc)
    })
}

exports.aes = function(req, res, next) {
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];
    
    // For encryption
    var result = aes.utils.utf8.toBytes(req.body.text);
    var aesCbc = new aes.ModeOfOperation.cbc(key, iv);
    var encryptedBytes = aesCbc.encrypt(result);
    var encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);    
    // res.send(encryptedHex)

    // For decrpytion
    var encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
    var aesCbc = new aes.ModeOfOperation.cbc(key, iv);
    var decryptedBytes = aesCbc.decrypt(encryptedBytes);
        
    // Convert our bytes back into text 
    var decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);
    res.send(decryptedText)      
}

exports.getCustomer = function(req, res, next) {
    Saved_customer.find({_customerId: req.params.id }, function(err, result) {
        if(err) res.send(err);
        if(result.length == 0) {
            res.json({status: '404'});
        }
        else {
            res.json(result)
        }
    })
}

exports.deleteCard = function(req, res, next) {
    Saved_customer.remove({_id: req.params.id}, function(err, card) {
        if(err) res.send('Something went wrong');
        res.json(card)
    })
}

exports.paymentList = function(req, res, next) {
    Payment.find({_customerId: req.query.id}, function(err, docs) {
        if(err) res.send(err);
        res.json(docs)
    })
}