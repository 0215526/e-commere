import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCardTotal, selectCartItems } from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckOutPage = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =>
                ( <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            )
        }

        <div className='total'>
            <span>Total: ${ total }</span>
        </div>

        <div className='test-warning'>
            *please USE the following credit card detail to make the payment*
            <br/>
            card-number: 4444333322221111 | EXP DT: 24/25 | CVV: 707
        </div>

        <StripeCheckoutButton price={total} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCardTotal
});

export default connect(mapStateToProps) (CheckOutPage);