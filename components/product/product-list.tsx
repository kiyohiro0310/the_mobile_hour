import { NextPage } from 'next'
import React from 'react'
import { Phone } from '../../Model/Types'
import classes from "./product.module.scss";
import Image from "next/image";
import Link from 'next/link';

interface PropsType {
    phones: Phone[]
}
const ProductList: NextPage<PropsType> = (props) => {
    const phones = props.phones;

  return (
    <div className={classes.product_boxes}>
        {phones.map((phone: Phone) => (
            <Link href={`/product/${phone.id}`}  key={phone.id}>
                <div className={classes.product_box}>
                    <div>
                        <Image src="/images/iphone13.png" alt="iphone 13 image" width={250} height={350}/>
                        <h2>{phone.product_name}</h2>
                    </div>
                    <h3>{phone.product_model}</h3>
                    <p>{phone.manufacturer}</p>
                    <p>from ${String(phone.price)}</p>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ProductList;