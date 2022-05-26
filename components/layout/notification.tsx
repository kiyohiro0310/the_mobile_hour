import React, { useContext } from 'react'
import { DataType } from '../../Model/Types';
import NotificationContext from '../provider/notification-context'
import classes from "./notification.module.scss"

const Notification: React.FC<DataType> = (props) => {
    const { status, title, message } = props;

    let activeClass = ``;
    if(status === "pending") {
        activeClass = `${classes.main} ${classes.pending}`;
    }
    if(status === "success") {
        activeClass = `${classes.main} ${classes.success}`;
    }
    if(status === "error") {
        activeClass = `${classes.main} ${classes.error}`;
    }
    if(status === "checkout") {
        activeClass = `${classes.main} ${classes.checkout}`;
    }
  return (
    <div className={activeClass}>
        <h2>{title}</h2>
        <p>{message}</p>
    </div>
  )
}

export default Notification