
const express = require("express");
const paymentRoute= express.Router();


paymentRoute.post('/create-payment-intent', async (req, res) => {
   const { amount } = req.body;
 
   try {
     const paymentIntent = await stripe.paymentIntents.create({
       amount,
       currency: 'usd',
     });
 
     res.send({
       clientSecret: paymentIntent.client_secret,
     });
   } catch (e) {
     res.status(500).send({ error: e.message });
   }
 });

 module.exports = paymentRoute;


