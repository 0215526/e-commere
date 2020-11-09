import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HldK6FOzWm7OUmC9rhWgh79BLwfjs9A78i9k1pbo7q16CMjqq00Y24AO6o3rORG5ZG55YtgUhwGnvFek1tlftzI00sdvi07Qx'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='paynow'
            name='e-Commerece'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}
        />
    ) 
}

export default StripeCheckoutButton;