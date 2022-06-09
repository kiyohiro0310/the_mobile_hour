import Link from 'next/link'
import React from 'react'
import classes from "./home-hero.module.scss"
import Image from 'next/image';

const HomeHero = () => {
  return (
    <div className={classes.container}>
        <div>
            <div className={classes.phone}>
                <div className={classes.image}>
                    <Image src="/images/home/phone.png" alt="phone image" width={110} height={46} layout="responsive" />
                </div>
            </div>
        </div>
        <div>
            <div className={classes.textbox}>
                <h1>Top brand mobile phone online.</h1>
                <p>We are selling top brand mobile phones online. Choose your best from multiple choices.</p>
                <Link href="/product"><a>Learn more</a></Link>
            </div>
        </div>
    </div>
  )
}

export default HomeHero