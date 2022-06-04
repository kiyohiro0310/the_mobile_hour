import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../components/provider/cart-context';
import classes from "../../components/cart/cart.module.scss";
import CartItem from '../../components/cart/cart-item';
import NotificationContext from '../../components/provider/notification-context';
import { useSession } from 'next-auth/react';
import { CustomerType, OrderDetailType, OrderType } from '../../Model/Types';
import { getAllOrderData, getAllOrderDetailData } from '../../lib/db-checkout';
import { NextPage } from 'next';

async function insertDataFunction(order: OrderType) {
  const response = await fetch("/api/order/insert", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  if(!data) {
    throw new Error("Something went wrong.");
  };

  return data;
}

async function insertDataDetailFunction(detail: OrderDetailType) {
  const response = await fetch("/api/order/insert-details", {
    method: "POST",
    body: JSON.stringify(detail),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  if(!data) {
    throw new Error("Something went wrong.");
  };

  return data;
}

interface PropsType {
  orders: OrderType[];
  details: OrderDetailType[];
}

const Cart: NextPage<PropsType> = (props) => {
  const cartCtx = useContext(CartContext);
  const notificationCtx = useContext(NotificationContext);
  const { data: session } = useSession();
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoaing] = useState(false);

  const nextOrderNumber = props.orders.length + 1;
  const nextOrderDetailNumber = props.details.length + 1;

  const date = new Date();
  const today = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

  const tomorrow = new Date(Date.now() + (3600 * 1000 * 24));
  const delivery_date = tomorrow.getFullYear() + "-" + (tomorrow.getMonth()+1) + "-" + tomorrow.getDate();
  const email = session?.user?.email;

  useEffect(() => {
    setIsLoaing(true);
    fetch("/api/customer/find", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(customer => {
      setCustomer(customer);
    });
    setIsLoaing(false);
  }, [email]);

  if(!session) {
    return (
    <div className={classes.cart_access}>
      <p>You can&apos;t use this function. Login is required.</p>
    </div>
    )
  }

  if(isLoading) {
    return(
      <div className={classes.cart_access}>
        <p>Loading...</p>
      </div>
    )
  }

  const cart = cartCtx.cart;
  let price = 0;
  let isCart = false;

  if(cart.length > 0) {
    isCart = true;
    for(let phone of cart) {
      price += Number(phone.price)
    }
  }

  async function checkoutHandler() {

    for(let i = 0; i < cart.length; i++) {
      const insertOrder = await insertDataFunction({
        order_number: nextOrderNumber + i,
        order_date: today,
        order_delivery_date: delivery_date,
        product_id: Number(cart[i].id),
        customer_id: customer?.id
      });

      if(!insertOrder) {
        notificationCtx.showNotification({
          title: "Error",
          message: "Error occured.",
          status: "error"
        })
        return;
      }

      const insertOrderDetail = await insertDataDetailFunction({
        id: nextOrderDetailNumber + i,
        product_id: Number(cart[i].id),
        quantity: 1,
        price_sold: Number(cart[i].price),
        order_number: nextOrderNumber + i
      })

      if(!insertOrderDetail) {
        notificationCtx.showNotification({
          title: "Error",
          message: "Error occured.",
          status: "error"
        })
        return;
      }

    }

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

export const getStaticProps = async () => {
  const data = await getAllOrderData();
  const JSONData = JSON.stringify(data);
  const orders = JSON.parse(JSONData);

  const detail_data = await getAllOrderDetailData();
  const JSONDetail_data = JSON.stringify(detail_data);
  const details = JSON.parse(JSONDetail_data);

  return {
    props: {
      orders: orders,
      details: details
    }
  }
}
export default Cart;