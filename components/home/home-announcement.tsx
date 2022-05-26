import React, { useContext } from 'react';
import classes from "./home-announcement.module.scss";
import Image from 'next/image';
import RegislationContext from '../provider/regislation-context';

const HomeAnnouncement = () => {
  const regislationCtx = useContext(RegislationContext);
  function setIsSignupHandler() {
    regislationCtx.setSignup();
}

  return (
    <div className={classes.container}>
      <div>
        <Image src="/images/logo.jpg" alt="the mobile hour logo" width={70} height={70} />
        <p>
          Get the new arrival information as soos as you can.<br/>
          We announce the latest product for users.
        </p>
        <a className={classes.signup} onClick={setIsSignupHandler}>Sign up</a>
      </div>
    </div>
  )
}

export default HomeAnnouncement