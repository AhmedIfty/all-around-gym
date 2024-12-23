import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!stripe || !cardElement) {
      setMessage("Stripe is not ready yet.");
      setIsProcessing(false);
      return;
    }

    try {
      // Call your backend to create a PaymentIntent
      const response = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 20, currency: "usd" }), // Replace with actual amount and currency
      });

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: "Test User" }, // Replace with real user details
        },
      });

      if (error) {
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (error) {
      setMessage("An error occurred while processing the payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;
