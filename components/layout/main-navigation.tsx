import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useContext, useState } from 'react'
import AdminContext from '../provider/admin-context';
import CartContext from '../provider/cart-context';
import RegislationContext from '../provider/regislation-context';
import classes from "./main-navigation.module.scss";

const MainNavigation = () => {
    const regislationCtx = useContext(RegislationContext);
    const cartCtx = useContext(CartContext);
    const adminCtx = useContext(AdminContext);

    const cart_items_amount = cartCtx.cart.length;

    let cart = false;
    if(cart_items_amount > 0) {
        cart = true;
    }

    const { data: session } = useSession();

    function logoutHandler() {
        signOut();
        adminCtx.setLoginFalse();
    }
    function setIsLoginHandler() {
        regislationCtx.setLogin();
    }
    function setIsSignupHandler() {
        regislationCtx.setSignup();
    }
    function setFalseHandler() {
        if(regislationCtx.isLogin){
            regislationCtx.setLogin();
        }
    }

  return (
      <Fragment>
        <div className={classes.container}>
            <div className={classes.left}>
                <Link href="/" tabIndex={0}><a className={classes.logo}><Image src="/images/logo.jpg" alt="logo" width={80} height={80} /></a></Link>
                <nav>
                    <Link href="/product" tabIndex={0}><a>Product</a></Link>
                    <Link href="/cart" tabIndex={0}><a>Cart</a></Link>
                    {cart && (<span className={classes.cart_notification}>{cart_items_amount}</span>)}
                </nav>
            </div>
            <div className={classes.right}>
                {!session && (
                    <nav>
                        <a className={classes.login} onClick={setIsLoginHandler} tabIndex={0}>Login</a>
                        <a className={classes.signup} onClick={setIsSignupHandler} tabIndex={0}>Sign up</a>
                    </nav>
                )}
                {session && (
                <nav>
                    <Link href="/profile" tabIndex={0}><a className={classes.signup} onClick={setFalseHandler} >Profile</a></Link>
                    <a className={classes.login} onClick={logoutHandler} tabIndex={0}>Logout</a>
                </nav>

                )}
            </div>
        </div>
      </Fragment>
  )
}

export default MainNavigation