import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button'
import CartItem from '../cart-item/cart-item';

import {CartDropDownContainer,
        EmptyMessage,
        CartItems,
} from  './cart-dropdown.styles.jsx'

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout')
    }

    return (
    <CartDropDownContainer>
        <CartItems>
        {cartItems.length ? (
            cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
        ) : (
            <EmptyMessage as='span'>Your cart is empty</EmptyMessage>
        )}
        </CartItems>
        <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
    );
};

    export default CartDropDown;