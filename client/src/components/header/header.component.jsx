import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.componet';
import CartDropdown from '../cart-dropdown/cart-dropdown.compenent';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <div className='logo-container'>
            <LogoContainer to='/'>
                <Logo className='logo'/>
            </LogoContainer>
        </div>
        <OptionsContainer>
            <OptionLink className='option' to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink className='option' to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={ signOutStart }>SIGN OUT</OptionLink>
                : 
                <OptionLink className='option' to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null :
            <CartDropdown />
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);