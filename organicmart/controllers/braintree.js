const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_KEY,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
})

exports.generateToken = (req,res) => {
   gateway.clientToken.generate({}, (err,response) => {
       if(err) {
           res.status(500).send(err);
       } else 
       {
           res.send(response);
       }
   });
}

exports.processPayment = (req, res) => {
    let nonceFromClient = req.body.paymentMethodNonce;
    let amountFromClient = req.body.amount;
 
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromClient,
            paymentMethodNonce: nonceFromClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
