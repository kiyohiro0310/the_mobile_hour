import React, { useContext, useEffect, useState } from 'react'
import classes from "../../components/admin/admin.module.scss";
import AdminLogin from '../../components/admin/admin-login';
import { useSession } from 'next-auth/react';
import AdminHome from '../../components/admin/admin-home';
import { GetStaticProps, NextPage } from 'next';
import { findAllAdmins, findAllChangeLogs, findAllPhones } from '../../lib/db';
import { AdminType, ChangeLogType, Phone } from '../../Model/Types';

interface PropsType {
    phones: Phone[];
    changeLogs: ChangeLogType[]
    admins: AdminType[]
}

const Admin: NextPage<PropsType> = (props) => {
    const phones = props.phones;
    const changeLogs = props.changeLogs;
    const admins = props.admins;

    const {data: session} = useSession();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const email = session?.user?.email;

    useEffect(()=> {
        setIsLoading(true);
        fetch("/api/admin/find", {
            method: "POST",
            body: JSON.stringify(email),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
        })
        setIsLoading(false)
    },[email]);

    if(!session) {
        return (
            <div className={classes.main}>
                <AdminLogin />
            </div>
        )
    }

  return (
    <div className={classes.main}>
        {session && (
            <AdminHome user={user} phones={phones} changeLogs={changeLogs} admins={admins}/>
        )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await findAllPhones();
    const JSONphoneData = JSON.stringify(data);
    const phones = JSON.parse(JSONphoneData);

    const logData = await findAllChangeLogs();
    const JSONlogData = JSON.stringify(logData);
    const changeLogs = JSON.parse(JSONlogData);

    const adminData = await findAllAdmins();
    const JSONadminData = JSON.stringify(adminData);
    const admins = JSON.parse(JSONadminData);

    return {
        props: {
            phones: phones,
            changeLogs: changeLogs,
            admins: admins
        }
    }
  }


export default Admin