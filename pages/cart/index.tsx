import React, { useContext } from 'react'
import CartContext from '../../components/provider/cart-context';
import classes from "../../components/cart/cart.module.scss";
import CartItem from '../../components/cart/cart-item';
import NotificationContext from '../../components/provider/notification-context';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);

  const cart = cartCtx.cart;
  let price = 0;
  let isCart = false;

  if(cart.length > 0) {
    isCart = true;
    for(let phone of cart) {
      price += Number(phone.price)
    }
  }

  function checkoutHandler() {
    notificationCtx.showNotification({
      title: "Enjoy!",
      message: "Thank you very much!",
      status: "checkout"
    });
    cartCtx.clearCartFunction();
  }

  return (
    <div className={classes.main}>
      <h1>Your Products</h1>
      {isCart && (
        <div className={classes.cart}>
          {cart.map(phone => (
            <CartItem key={phone.id} phone={phone}/>
          ))}
        <div className={classes.cart_check}>
          <div>
            <span>$ {price}</span>
            <button onClick={checkoutHandler}>Checkout</button>
          </div>
        </div>
      </div>
      )}
      {!isCart && (
        <div className={classes.cart_empty}>
          Your cart is empty.
        </div>
      )}
      </div>
  )
}

export default Cart