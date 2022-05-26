import React from 'react'
import classes from "./home-products.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import { Phones } from '../../Model/Types';
import { NextPage } from 'next';

const HomeProducts: NextPage<Phones> = (props) => {

  const phones = props.phones;

  return (
    <div className={classes.container}>
      <h1>Latest on The Mobile Hour</h1>


      <div className={classes.products}>
        {phones.map(phone => (
          <Link href={`/product/${phone.id}`} key={phone.id}>
            <div className={classes.product_box}>
              <div className={classes.product}>
                <Image src="/images/home/phone3.png" alt="iphone 13 pro" width={160} height={180}/>
                  <h3>{phone.product_name}</h3>
              </div>
              <>From AUS${phone.price}</>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomeProducts