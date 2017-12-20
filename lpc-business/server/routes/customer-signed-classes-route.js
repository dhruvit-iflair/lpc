var mongoose = require('mongoose'),
    CustomerSignedClasses = require('../models/customer-signed-classes-model.js')
    Payment = require('../models/payment-model.js')
    Refund = require('../models/refund-model.js')
    var stripe = require("stripe")("sk_test_5tOuRyslg0a37W0JI4ZswoZg");

module.exports = function(app) {
    app.get('/signedCustomer', function(req, res) {
        CustomerSignedClasses.findOne({_customerId: req.query.id})
            .populate({
                path: '_classId.classes',
                populate: {
                    path: '_businessId'
                }
            })
            .exec(function(err, docs) {
                if(err) res.send(err)
                res.json(docs)
            })
    })

    app.get('/deleteclass', function(req, res) {
        CustomerSignedClasses.findOne({_id: req.query.customer_id}, function(err, result) {
            if(err) res.send(err);
            if(result) {
                Payment.findOne({_classId: req.query.class_id})
                    .populate({
                        path: '_classId',
                        populate: {
                            path: '_businessId'
                        }
                    })
                    .exec( function(err, doc) {
                        if(err) res.send(err);
                        if(doc) {
                            stripe.refunds.create({
                                charge: doc.charge_id,
                                refund_application_fee: true,
                            }, {
                                stripe_account: doc._classId._businessId.account_id,
                            })
                            .then(function(refund) {
                                index = result._classId.findIndex(x => x.classes == req.query.class_id)
                                if(index >= 0) {
                                    result._classId.splice(index, 1)
                                    CustomerSignedClasses.findByIdAndUpdate({_id: result._id},
                                        result, {new: true}, function(err, cs) {
                                            if(err) res.send(err);
                                            var all = {
                                                refund_id: refund.id,
                                                amount: refund.amount,
                                                txn_id: refund.balance_transaction,
                                                charge_id: refund.charge,
                                                created_at: refund.created,
                                                object: refund.object,
                                                status: refund.status,
                                                customer_card_id: doc.customer_card_id,
                                                _customerId: doc._customerId,
                                                _classId: doc._classId,
                                                email: doc.email,
                                                name: doc.name
                                            }
                                            var r = new Refund(all);
                                            r.save(function(err, ref) {
                                                if(err) res.send(err);
                                                res.send(ref)
                                            }).then(function() {
                                                Payment.remove({charge_id: refund.charge}, function() {
                                                    if(err) res.send(err);
                                                })
                                            })
                                        })
                                // })
                                } else {
                                    res.send('Class not found')
                                }
                            });
                        }
                    })
            }            
        })
    });
}