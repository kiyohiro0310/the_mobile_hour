import Image from 'next/image'
import React from 'react'
import classes from "./phone-feature.module.scss"

const PhoneFeature = () => {
  return (
    <div className={classes.container}>
        <h1>Enjoy the modern features.</h1>
        <div className={classes.iphone}>
            <div className={classes.image}>
                <Image src="/images/home/home7.jpg" alt="iphone image" width={350} height={250} />
            </div>
            <div className={classes.image_description}>
                <h2>
                    If you are not familiar with  modern features,
                    iphone should be with you.
                </h2>
                <p>
                    It includes innovative features like Visual Voicemail and standard features like text messaging, voice dialing, and free conference calls.
                </p>
            </div>
        </div>
        <div className={classes.android}>
            <div className={classes.image_description}>
                <h2>
                    Beautiful UI Android OS basic screen provides a beautiful and intuitive user interface.
                </h2>
                <p>
                The fresh look is the first thing you’ll notice about Android 12. Google has revamped its design language with a visual overhaul that builds upon its deep customization options.
                </p>
            </div>
            <div className={classes.image}>
                <Image src="/images/home/home6.jpg" alt="iphone image" width={350} height={250} />
            </div>
        </div>
    </div>
  )
}

export default PhoneFeature