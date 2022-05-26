import { NextPage } from 'next'
import Router from 'next/router'
import React, { FormEvent, Fragment, useContext, useState } from 'react'
import { CustomerType } from '../../Model/Types'
import NotificationContext from '../provider/notification-context'
import classes from "./customer.module.scss"
import { signOut } from 'next-auth/react';


interface PropsType {
    customer: CustomerType | null,
}

async function editUpdateCustomer(updateCustomer: {}) {
    const response = await fetch("/api/customer/update", {
        method: "POST",
        body: JSON.stringify(updateCustomer),
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

const CustomerProfile: NextPage<PropsType> = (props) => {
    const { customer } = props;

    const [isDelete, setIsDelete] = useState(false);
    const notificationCtx = useContext(NotificationContext);

    const firstnameRef = React.createRef<HTMLInputElement>()
    const lastnameRef = React.createRef<HTMLInputElement>()
    const phoneRef = React.createRef<HTMLInputElement>()
    const emailRef = React.createRef<HTMLInputElement>()
    const addressRef = React.createRef<HTMLInputElement>()
    const cityRef = React.createRef<HTMLInputElement>()
    const postcodeRef = React.createRef<HTMLInputElement>()
    const stateRef = React.createRef<HTMLInputElement>()
    const newPasswordRef = React.createRef<HTMLInputElement>()
    const currentPasswordRef = React.createRef<HTMLInputElement>()


    if(!customer) {
        return <p>Loading...</p>
    }

    function setDeleteHandler() {
        setIsDelete(prevState => !prevState);
    }

    function deleteHandler() {
        fetch("/api/customer/delete", {
            method: "POST",
            body: JSON.stringify(customer?.email!),
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
        Router.replace("/");
    }

    async function submitHandler(e: FormEvent) {
        e.preventDefault();
        const enteredFirstName = firstnameRef.current!.value;
        const enteredLastName = lastnameRef.current!.value;
        const enteredPhone = phoneRef.current!.value;
        const enteredEmail = emailRef.current!.value;
        const enteredAddress = addressRef.current!.value;
        const enteredCity = cityRef.current!.value;
        const enteredPostcode = Number(postcodeRef.current!.value);
        const enteredState = stateRef.current!.value;
        const enteredNewPassword = newPasswordRef.current!.value;
        const enteredCurrentPassword = currentPasswordRef.current!.value;

        if(!enteredNewPassword) {
            const updateCustomer = {
                firstname: enteredFirstName,
                lastname: enteredLastName,
                phone: enteredPhone,
                email: enteredEmail,
                address: enteredAddress,
                city: enteredCity,
                postcode: enteredPostcode,
                state: enteredState
            }

            const data = await editUpdateCustomer(updateCustomer);

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
            const updateCustomer = {
                firstname: enteredFirstName,
                lastname: enteredLastName,
                phone: enteredPhone,
                email: enteredEmail,
                address: enteredAddress,
                city: enteredCity,
                postcode: enteredPostcode,
                state: enteredState,
                newPassword: enteredNewPassword,
                currentPassword: enteredCurrentPassword
            }

            const data = await editUpdateCustomer(updateCustomer);

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
        {isDelete && (
            <div className={classes.delete_container}>
                <div className={classes.delete_confirm}>
                    <h1>Delete User?</h1>
                    <div className={classes.delete_boxes}>
                        <div>
                            <h3>Name:</h3>
                            <p>{customer.firstname} {customer.lastname}</p>
                        </div>
                        <div>
                            <h3>Phone:</h3>
                            <p>{customer.phone}</p>
                        </div>
                        <div>
                            <h3>Email:</h3>
                            <p>{customer.email}</p>
                        </div>
                        <div>
                            <h3>Address:</h3>
                            <span>{customer.address}</span> <span>{customer.city}</span> <span>{String(customer.postcode)}</span> <span>{customer.state}</span>
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
                        <input type="text" defaultValue={customer.firstname} ref={firstnameRef} />
                    </div>
                    <div>
                        <h3>Last Name: </h3>
                        <input type="text" defaultValue={customer.lastname} ref={lastnameRef} />
                    </div>
                    <div>
                        <h3>Phone: </h3>
                        <input type="tel" defaultValue={customer.phone} ref={phoneRef} />
                    </div>
                    <div>
                        <h3>Email: </h3>
                        <input type="text" defaultValue={customer.email}  ref={emailRef} />
                    </div>
                    <div>
                        <h3>Address: </h3>
                        <input type="text" defaultValue={customer.address} ref={addressRef} />
                    </div>
                    <div>
                        <h3>City: </h3>
                        <input type="text" defaultValue={customer.city} ref={cityRef} />
                    </div>
                    <div>
                        <h3>Postcode: </h3>
                        <input type="text" defaultValue={String(customer.postcode)}  ref={postcodeRef} />
                    </div>
                    <div>
                        <h3>State: </h3>
                        <input type="text" defaultValue={customer.state}  ref={stateRef} />
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


export default CustomerProfile