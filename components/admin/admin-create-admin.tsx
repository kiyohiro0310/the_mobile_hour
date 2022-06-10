import next, { NextPage } from 'next';
import Router from 'next/router';
import React, { FormEvent, Fragment, useContext } from 'react';
import { hashPassword } from '../../lib/auth';
import { AdminType } from '../../Model/Types';
import NotificationContext from '../provider/notification-context';
import classes from "./admin.module.scss";

async function createAdminFunction(admin: AdminType) {
  const response = await fetch("/api/admin/create", {
    method: "POST",
    body: JSON.stringify(admin),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  if(!response.ok) {
    throw new Error("Something went wrong.");
  }
  return data;
}

interface PropsType {
  admins: AdminType[]
  onSet: () => void;
}

const CreateAdmin: NextPage<PropsType> = (props) => {
  const admins = props.admins;
  const nextID = admins.length + 1;

  const firstnameRef = React.createRef<HTMLInputElement>()
  const lastnameRef = React.createRef<HTMLInputElement>()
  const roleRef = React.createRef<HTMLInputElement>()
  const usernameRef = React.createRef<HTMLInputElement>()
  const emailRef = React.createRef<HTMLInputElement>()
  const passwordRef = React.createRef<HTMLInputElement>()

  const notificationCtx = useContext(NotificationContext);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    const enteredFirstName = firstnameRef.current!.value;
    const enteredLastName = lastnameRef.current!.value;
    const enteredRole = roleRef.current!.value;
    const enteredUsername = usernameRef.current!.value;
    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    const hashedPassword = await hashPassword(enteredPassword);

    const admin: AdminType = {
      id: nextID,
      firstname: enteredFirstName,
      lastname: enteredLastName,
      role: enteredRole,
      username: enteredUsername,
      email: enteredEmail,
      password: hashedPassword
    };

    const data = await createAdminFunction(admin);

    if(data.error) {
      notificationCtx.showNotification({
        title: "Error",
        message: "Couldn't Update product.",
        status: "error"
      })
    }else{
      notificationCtx.showNotification({
        title: "Success",
        message: "Update product successfully.",
        status: "success"
      });
      props.onSet();
      Router.replace("/admin");
    }

  }

  return (
    <Fragment>
      <h2>Create Form</h2>
    <div className={classes.container}>
    <form onSubmit={submitHandler} >
        <div className={classes.info}>
            <div>
                <h3>First Name: </h3>
                <input type="text" required ref={firstnameRef} pattern="[a-zA-z]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
            </div>
            <div>
                <h3>Last Name: </h3>
                <input type="text" required ref={lastnameRef} pattern="[a-zA-z]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
            </div>
            <div>
                <h3>Role: </h3>
                <input type="tel" required ref={roleRef} pattern="[a-zA-z]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
            </div>
            <div>
                <h3>User Name: </h3>
                <input type="tel" required ref={usernameRef} pattern="[a-zA-z]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
            </div>
            <div>
                <h3>Email: </h3>
                <input type="text" required ref={emailRef} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                <span className={classes.input_validation}>Invalid input.</span>
            </div>
            <div>
                <h3>New Password: </h3>
                <input type="password" required ref={passwordRef} />
                <span className={classes.input_validation}>Invalid input.</span>
            </div>
        </div>

        <div className={classes.edit}>
            <input type="submit" value="Create" className={classes.button} />
        </div>
    </form>
</div>
</Fragment>

  )
}

export default CreateAdmin;