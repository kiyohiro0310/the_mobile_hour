import { NextPage } from 'next'
import Router from 'next/router'
import React, { FormEvent, Fragment, useContext, useState } from 'react'
import { AdminType } from '../../Model/Types'
import NotificationContext from '../provider/notification-context'
import classes from "../admin/admin.module.scss";
import { signOut } from 'next-auth/react';
import AdminContext from '../provider/admin-context'


interface PropsType {
    admin: AdminType | null,
}

async function editUpdateAdmin(updateAdmin: {}) {
    const response = await fetch("/api/admin/update", {
        method: "POST",
        body: JSON.stringify(updateAdmin),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();

    if(!response.ok) {
        return;
    }
    return data;
}

const AdminProfile: NextPage<PropsType> = (props) => {
    const { admin } = props;
    const adminCtx = useContext(AdminContext);

    if(!admin) {
        Router.replace("/")
    }

    const [isDelete, setIsDelete] = useState(false);
    const notificationCtx = useContext(NotificationContext);

    const firstnameRef = React.createRef<HTMLInputElement>()
    const lastnameRef = React.createRef<HTMLInputElement>()
    const roleRef = React.createRef<HTMLInputElement>()
    const usernameRef = React.createRef<HTMLInputElement>()
    const emailRef = React.createRef<HTMLInputElement>()
    const newPasswordRef = React.createRef<HTMLInputElement>()
    const currentPasswordRef = React.createRef<HTMLInputElement>()

    if(!admin) {
        return <p>Loading...</p>
    }

    function setDeleteHandler() {
        setIsDelete(prevState => !prevState);
    }

    function deleteHandler() {
        fetch("/api/admin/delete", {
            method: "POST",
            body: JSON.stringify(admin?.email!),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Something went wrong");
            }
            res.json()
        })
        .then(data => {

        })
        setIsDelete(prevState => !prevState);
        notificationCtx.showNotification({
            title: "Success",
            message: "Delete account successfully.",
            status: "success"
        })
        signOut();
        adminCtx.setLoginFalse();
        Router.replace("/");
    }

    async function submitHandler(e: FormEvent) {
        e.preventDefault();
        const enteredFirstName = firstnameRef.current!.value;
        const enteredLastName = lastnameRef.current!.value;
        const enteredRole = roleRef.current!.value;
        const enteredUsername = usernameRef.current!.value;
        const enteredEmail = emailRef.current!.value;
        const enteredNewPassword = newPasswordRef.current!.value;
        const enteredCurrentPassword = currentPasswordRef.current!.value;

        if(!enteredNewPassword) {
            const updateAdmin = {
                firstname: enteredFirstName,
                lastname: enteredLastName,
                role: enteredRole,
                username: enteredUsername,
                email: enteredEmail,
            }

            const data = await editUpdateAdmin(updateAdmin);

            if(data) {
                notificationCtx.showNotification({
                    title: "Success",
                    message: "Update successfully.",
                    status: "success"
                })
            }
            else{
                notificationCtx.showNotification({
                    title: "Error",
                    message: "Update failed. Maybe there is no change.",
                    status: "error"
                })

            }
        }else{
            const updateAdmin = {
                firstname: enteredFirstName,
                lastname: enteredLastName,
                role: enteredRole,
                username: enteredUsername,
                email: enteredEmail,
                newPassword: enteredNewPassword,
                currentPassword: enteredCurrentPassword
            }

            const data = await editUpdateAdmin(updateAdmin);

            if(data) {
                notificationCtx.showNotification({
                    title: "Success",
                    message: "Update successfully.",
                    status: "success"
                })
            }
            else{
                notificationCtx.showNotification({
                    title: "Error",
                    message: "Update failed. Maybe there is no change.",
                    status: "error"
                })

            }
    }
}

  return (
    <Fragment>
        <h2>Admin Info</h2>
        <p>Modify your personal info here.</p>
        {isDelete && (
            <div className={classes.delete_container}>
                <div className={classes.delete_confirm}>
                    <h1>Delete Admin?</h1>
                    <div className={classes.delete_boxes}>
                        <div>
                            <h3>Name:</h3>
                            <p>{admin.firstname} {admin.lastname}</p>
                        </div>
                        <div>
                            <h3>Username:</h3>
                            <p>{admin.username}</p>
                        </div>
                        <div>
                            <h3>Email:</h3>
                            <p>{admin.email}</p>
                        </div>
                    </div>
                    <div className={classes.delete_button}>
                        <button onClick={deleteHandler}>Delete</button>
                        <button onClick={setDeleteHandler}>Cancel</button>
                    </div>
                </div>
                <div className={classes.delete_background}></div>
            </div>
    )}

        <div className={classes.container}>
            <form onSubmit={submitHandler} >
                <div className={classes.info}>
                    <div>
                        <h3>First Name: </h3>
                        <input type="text" defaultValue={admin.firstname} ref={firstnameRef} />
                    </div>
                    <div>
                        <h3>Last Name: </h3>
                        <input type="text" defaultValue={admin.lastname} ref={lastnameRef} />
                    </div>
                    <div>
                        <h3>Role: </h3>
                        <input type="tel" defaultValue={admin.role} ref={roleRef} />
                    </div>
                    <div>
                        <h3>User Name: </h3>
                        <input type="tel" defaultValue={admin.username} ref={usernameRef} />
                    </div>
                    <div>
                        <h3>Email: </h3>
                        <input type="text" defaultValue={admin.email}  ref={emailRef} />
                    </div>
                    <div>
                        <h3>New Password: </h3>
                        <input type="password" ref={newPasswordRef} />
                    </div>
                    <div>
                        <h3>Current Password: </h3>
                        <input type="password" ref={currentPasswordRef} />
                    </div>
                </div>

                <div className={classes.edit}>
                    <input type="submit" value="Update" className={classes.button} />
                </div>
            </form>
            <div className={classes.delete}>
                <button className={classes.button} onClick={setDeleteHandler} >Delete</button>
            </div>
        </div>
    </Fragment>
  )
}


export default AdminProfile;