import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { Phone, Feature } from '../../Model/Types';
import CartContext from '../provider/cart-context';
import NotificationContext from '../provider/notification-context';
import classes from "./product.module.scss";

interface PropsType {
    phone: Phone;
    feature: Feature;
}

const ProductDetailPage: NextPage<PropsType> = (props) => {
    const { phone, feature } = props;
    const cartCtx = useContext(CartContext);
    const notificationCtx = useContext(NotificationContext);
    const router = useRouter();

    function addCartHandler() {
        cartCtx.addCartFunction(phone);
        notificationCtx.showNotification({
            title: "Added!",
            message: "Added cart successfully. Thank you.",
            status: "success"
        });
    }

  return (
    <div className={classes.main_product_detail}>
        <div className={classes.main_container}>
            <div className={classes.image}>
                <div>
                    <Image src="/images/iphone13.png" alt={`${phone.product_name} image`} width={300} height={370}/>
                </div>
                <div>
                    <p><b>Price: </b>${String(phone.price)}</p>
                    <p><b>Stock: </b>{String(phone.stock_on_hand)}</p>
                    <button onClick={addCartHandler}>Add to Cart</button>
                </div>
            </div>
            <div className={classes.description}>
                <h1>{phone.product_name}</h1>

                <h3>Resolution:</h3>
                <p>{feature.resolution}</p>

                <h3>CPU:</h3>
                <p>{feature.CPU}</p>

                <h3>Screen Size:</h3>
                <p>{feature.screensize}</p>

                <h3>Storage:</h3>
                <p>{feature.storage}</p>

                <h3>Battery:</h3>
                <p>{feature.battery}</p>

                <h3>Camera:</h3>
                <p>Front: {feature.front_camera}</p>
                <p>Rear: {feature.rear_camera}</p>

            </div>
        </div>
    </div>
  )
}

export default ProductDetailPage