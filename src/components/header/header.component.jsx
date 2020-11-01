import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.componet';
import CartDropdown from '../cart-dropdown/cart-dropdown.compenent';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <div className='logo-container'>
            <Link to='/'>
                <Logo className='logo'/>
            </Link>
        </div>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                : 
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null :
            <CartDropdown />
        }
    </div>
)

const mapStateToProps = ({ user: { currentUser }, cart: { hidden }}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);