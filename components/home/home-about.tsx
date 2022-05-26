import React from 'react'
import classes from "./home-about.module.scss"

const HomeAbout = () => {
  return (
    <div className={classes.container}>
        <h1>The Mobile Hour</h1>
        <section>
            <div className={classes.left}>
                <div className={classes.image}>
                    <h1>Certified Sellers.</h1>
                </div>
            </div>
            <div className={classes.right}>
                <div>
                    <div className={classes.image}>
                        <h1>12 Months Warranty.</h1>
                    </div>
                </div>
                <div>
                    <div className={classes.image}>
                        <h1>14 Days Free Return.</h1>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default HomeAbout