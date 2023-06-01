import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Checkout";

function Payment() {
  // const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe('pk_test_51MlrVBJ7mapjSr4rb6XsMKY6dP1OjqSFj1aLQXuiDGal2bTUdv8C200RbhYIO1iYnABFG3KIG5b3G8MqJ13a9pVJ00QhPxATVf')
  // useEffect(() => {
  //   fetch("/config").then(async (r) => {
  //     const { publishableKey } = await r.json();
  //     setStripePromise(loadStripe(publishableKey));
  //   });
  // }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1>Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;