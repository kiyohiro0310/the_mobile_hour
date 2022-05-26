import React, { useContext } from 'react'
import classes from "./cart.module.scss";
import Image from 'next/image';
import { Phone } from '../../Model/Types';
import { NextPage } from 'next';
import Link from 'next/link';
import CartContext from '../provider/cart-context';

interface PropsType {
    phone: Phone;
}

const CartItem: NextPage<PropsType> = (props) => {
    const phone = props.phone;
    const cartCtx = useContext(CartContext);

    function deleteHandler() {
        cartCtx.removeCartFunction(phone.id);
    }

  return (
    <div className={classes.product_boxes}>
        <div className={classes.product_box}>
            <div className={classes.image}>
                <Image src="/images/iphone13.png" alt="phone image" width={170} height={220} />
            </div>
            <div className={classes.description}>
                <h2>{phone.product_name}</h2>
                <p>Manufacture: {phone.manufacturer}</p>
                <p>Price: ${String(phone.price)}</p>
                <Link href={`/product/${phone.id}`}><a>detail</a></Link>
                <span onClick={deleteHandler}>delete</span>
            </div>
        </div>
    </div>

  )
}

export default CartItem