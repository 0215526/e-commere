import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCardTotal, selectCartItems } from '../../redux/cart/cart.selectors';

import {
    CheckoutPageContainer,
    CheckoutHeaderContainer,
    HeaderBlockContainer,
    TotalContainer,
    WarningContainer
} from './checkout.styles';

const CheckOutPage = ({cartItems, total}) => (
    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <HeaderBlockContainer>
                <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Remove</span>
            </HeaderBlockContainer>
        </CheckoutHeaderContainer>
        {
            cartItems.map(cartItem =>
                ( <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            )
        }

        <TotalContainer>
            <span>Total: ${ total }</span>
        </TotalContainer>

        <WarningContainer>
            *please USE the following credit card detail to make the payment*
            <br/>
            card-number: 4444333322221111 | EXP DT: 24/25 | CVV: 707
        </WarningContainer>

        <StripeCheckoutButton price={total} />
    </CheckoutPageContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCardTotal
});

export default connect(mapStateToProps) (CheckOutPage);