import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HldK6FOzWm7OUmC9rhWgh79BLwfjs9A78i9k1pbo7q16CMjqq00Y24AO6o3rORG5ZG55YtgUhwGnvFek1tlftzI00sdvi07Qx'

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            } 
        }).then(response => {
            alert('Payment Successful');
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment. Please make sure you use the provided credit card');
        })
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