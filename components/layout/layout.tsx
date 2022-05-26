import React, { Fragment, ReactNode, useContext } from 'react'
import MainNavigation from './main-navigation'
import MainFooter from './main-footer';
import { NextPage } from 'next';
import Notification from './notification';
import NotificationContext from '../provider/notification-context';
import { DataType } from '../../Model/Types';
import RegislationContext from '../provider/regislation-context';
import Regislation from '../regislation/regislation';

interface TypeProps {
    children: ReactNode;
}
const Layout: NextPage<TypeProps> = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification: any = notificationCtx.notification;
  const regislationCtx = useContext(RegislationContext);


  return (
    <Fragment>
        <MainNavigation />
        {props.children}
        <MainFooter />
        {regislationCtx.isLogin && <Regislation isLogin={regislationCtx.isLogin} isSignup={regislationCtx.isSignup}/>}
        {regislationCtx.isSignup && <Regislation isLogin={regislationCtx.isLogin} isSignup={regislationCtx.isSignup}/>}

        {activeNotification && (<Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />)}
    </Fragment>
  )
}

export default Layout