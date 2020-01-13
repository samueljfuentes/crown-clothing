import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
   // stripe API requires price in cents...
   const priceForStripe = price * 100;
   const pubslishableKey = 'pk_test_SnyCdaWmBTy9dDN3hIauYxlL00xYYXgmbz';
   
   // tokens are the 'on success' response...
   const onToken = (token) => {
      console.log(token);
      alert('Payment Successful!');
   }

   return (
      <StripeCheckout 
         label="Pay Now"
         name="Crown Clothing"
         billingAddress
         shippingAddress
         image="https://sendeyo.com/up/d/f3eb2117da"
         description={`Your total is $$ ${price}`}
         amount={priceForStripe}
         panelLabel="Pay Now"
         // tokens are the 'on success' response...
         token={onToken}
         stripeKey={pubslishableKey}/>
   )
};

export default StripeCheckoutButton;
