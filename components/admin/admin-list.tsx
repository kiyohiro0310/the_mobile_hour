import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import React, { FormEvent, Fragment, useContext, useState } from 'react'
import { findAdminById } from '../../lib/db';
import { AdminType, UpdateAdminType } from '../../Model/Types'
import NotificationContext from '../provider/notification-context';
import classes from "./admin.module.scss";

interface PropsType {
    admins: AdminType[],
    onSet: () => void;
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

async function findAdmin(id: string) {
    const response = await fetch("/api/admin/find-by-id", {
        method: "POST",
        body: JSON.stringify(id),
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

const AdminList: NextPage<PropsType> = (props) => {
    const admins = props.admins;

    const [isAdmin, setIsAdmin] = useState<AdminType>();
    const [isDelete, setIsDelete] = useState(false);

    const adminIDRef = React.createRef<HTMLInputElement>()
    const firstnameRef = React.createRef<HTMLInputElement>()
    const lastnameRef = React.createRef<HTMLInputElement>()
    const roleRef = React.createRef<HTMLInputElement>()
    const usernameRef = React.createRef<HTMLInputElement>()
    const emailRef = React.createRef<HTMLInputElement>()
    const newPasswordRef = React.createRef<HTMLInputElement>()
    const currentPasswordRef = React.createRef<HTMLInputElement>()

    const notificationCtx = useContext(NotificationContext);

    function setDeleteHandler() {
        setIsDelete(prevState => !prevState);
    }

    function deleteHandler() {
        fetch("/api/admin/delete", {
            method: "POST",
            body: JSON.stringify(isAdmin?.email!),
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
        .then(data => {})
        setIsDelete(prevState => !prevState);
        notificationCtx.showNotification({
            title: "Success",
            message: "Delete account successfully.",
            status: "success"
        })
        Router.replace("/");
    }

    async function submitSearchHandler(e: FormEvent) {
      e.preventDefault();
      const enteredAdminID = adminIDRef.current!.value;

      const data = await findAdmin(enteredAdminID);

      setIsAdmin(data);
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
    <div className={classes.change_container}>
        <Fragment>
        {!isAdmin && (
        <>
            <div className={classes.add_product}>
            <h3><span>Modify</span> Account</h3>
            <form onSubmit={submitSearchHandler}>
                <div className={classes.product_detail}>
                <div className={classes.search_product}>
                    <label htmlFor="user_id">User ID:</label>
                    <input type="text" name='user_id' required ref={adminIDRef}/>
                </div>
                <div>
                    <input type="submit" value="Search" className={classes.submit} />
                </div>
                </div>
            </form>
            </div>
        </>
            )}
        {isAdmin && (
          <>
            {isDelete && (
                    <div className={classes.delete_container}>
                        <div className={classes.delete_confirm}>
                            <h1>Delete User?</h1>
                            <div className={classes.delete_boxes}>
                                <div>
                                    <h3>Name:</h3>
                                    <p>{isAdmin.firstname} {isAdmin.lastname}</p>
                                </div>
                                <div>
                                    <h3>Username:</h3>
                                    <p>{isAdmin.username}</p>
                                </div>
                                <div>
                                    <h3>Email:</h3>
                                    <p>{isAdmin.email}</p>
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

                <div className={classes.add_product}>
                <h3>Product <span>Detail</span></h3>
                <form onSubmit={submitHandler}>
                  <div className={classes.product_detail}>
                  <div>
                        <h3>First Name: </h3>
                        <input type="text" defaultValue={isAdmin.firstname} ref={firstnameRef} />
                    </div>
                    <div>
                        <h3>Last Name: </h3>
                        <input type="text" defaultValue={isAdmin.lastname} ref={lastnameRef} />
                    </div>
                    <div>
                        <h3>Role: </h3>
                        <input type="tel" defaultValue={isAdmin.role} ref={roleRef} />
                    </div>
                    <div>
                        <h3>User Name: </h3>
                        <input type="tel" defaultValue={isAdmin.username} ref={usernameRef} />
                    </div>
                    <div>
                        <h3>Email: </h3>
                        <input type="text" defaultValue={isAdmin.email}  ref={emailRef} />
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
                  <div>
                    <input type="submit" value="Update" className={classes.submit} />
                  </div>
                </form>
                <div className={classes.delete}>
                  <button className={classes.button} onClick={setDeleteHandler}>Delete</button>
                </div>
              </div>
        </>
        )}
    </Fragment>
    <table>
            <caption>
                <h3><span>Admin</span> List</h3>
            </caption>
            <thead>
                <tr>
                    <th>id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>

            {admins.map(admin => (
                <tbody key={String(admin.id)}>
                    <tr>
                        <td>{String(admin.id)}</td>
                        <td>{admin.firstname}</td>
                        <td>{admin.lastname}</td>
                        <td>{admin.role}</td>
                        <td>{admin.username}</td>
                        <td>{admin.email}</td>
                    </tr>
                </tbody>
            ))}
        </table>

    </div>
  )
}

export default AdminList