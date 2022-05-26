import { NextPage } from 'next';
import { SignInResponse } from 'next-auth/react';
import React, { FormEvent, useContext } from 'react'
import NotificationContext from '../provider/notification-context';
import classes from "./admin.module.scss";
import { signIn } from 'next-auth/react';
import AdminContext from '../provider/admin-context';
import { AdminType } from '../../Model/Types';


type resultType = SignInResponse | undefined;


const AdminLogin: NextPage = (props) => {
    const emailRef = React.createRef<HTMLInputElement>();
    const passwordRef = React.createRef<HTMLInputElement>();

    const adminCtx = useContext(AdminContext);
    const notificationCtx = useContext(NotificationContext);

    async function submitHandler(e: FormEvent) {
        e.preventDefault();
        const enteredEmail = emailRef.current!.value;
        const enteredPassword = passwordRef.current!.value;

        const result: resultType = await signIn("credentials", {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword
        });

        if(result!.error){
            notificationCtx.showNotification({
                title: "Error.",
                message: "Admin not found.",
                status: "error"
            })
        }else{
            notificationCtx.showNotification({
                title: "Success",
                message: "Login as admin successfully",
                status: "success"
              });
        }
        adminCtx.setLoginTrue();
    }

  return (
    <>
        <h1>Admin Login</h1>

        <div className={classes.login_form}>
            <form onSubmit={submitHandler}>
                <div>
                    <input type="email" className={classes.input} placeholder="Email" required ref={emailRef}/>
                    <span className={classes.input_validation}>Email is invalid.</span>
                </div>
                <div>
                    <input type="password" className={classes.input} placeholder="Password" required ref={passwordRef}/>
                    <span className={classes.input_validation}>Password is invalid.</span>
                </div>
                <input type="submit" value="Login" className={classes.button}/>
            </form>
        </div>
    </>
  )
}

export default AdminLogin