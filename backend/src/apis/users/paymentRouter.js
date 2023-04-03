// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import express from "express";
import createHttpError from "http-errors";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment", async (req, res) => {
  const { amount, currency, payment_method } = req.body;

  // Create a new payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method,
    customer: req.user.stripeCustomerId // assuming you have a logged in user with a Stripe customer ID stored in your MongoDB
  });

  // Update the payment status in your MongoDB
  await Payment.findOneAndUpdate(
    { paymentIntentId: paymentIntent.id },
    { status: "created" }
  );

  // Return the payment intent ID to the client-side
  res.send({ paymentIntentId: paymentIntent.id });
});

paymentRouter.post("/handle-payment", async (req, res) => {
  const { paymentIntentId } = req.body;

  // Retrieve the payment intent object from Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  // Update the payment status in your MongoDB
  await Payment.findOneAndUpdate(
    { paymentIntentId: paymentIntent.id },
    { status: paymentIntent.status }
  );

  // Return the payment status to the client-side
  res.send({ status: paymentIntent.status });
});

export default paymentRouter;
