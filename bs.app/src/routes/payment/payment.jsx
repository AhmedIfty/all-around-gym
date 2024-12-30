import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/pgetway/pgetway"; 

// Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51QYvzaJi9PDA9XsNPnfEQ0v4VYjur0bFGkfFtJBF0mAiumlJoyzKYtD7ARaGDlGPaY11F6WJMJE98H1KEoPsdxbF00ovNfFrGl"); // Replace with your Stripe publishable key

const Payment = () => {
  return (
    <div>
      <h1>Make a Payment</h1>
      <Elements stripe={stripePromise} options={{ appearance: { theme: "stripe" } }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
