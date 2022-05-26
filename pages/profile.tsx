import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import AdminProfile from '../components/admin/admin-profile';
import CustomerProfile from '../components/customer/customer-profile';
import classes from "../components/customer/customer.module.scss";
import AdminContext from '../components/provider/admin-context';

interface PropsType {
    session: Session
}

const Profile: React.FC<PropsType> = (props) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    if(!session){
        router.replace("/");
    }

    const email = session?.user?.email!;

    useEffect(()=> {
        setIsLoading(true);
        fetch('/api/customer/find', {
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

    if(isLoading) {
        return <p>Loading...</p>
    }
    if(!user) {
        return <p className={classes.announce}>Currently, you logged in as Admin.</p>
    }

  return (
    <div className={classes.main}>
        <h1>Profile</h1>
        <p>Change your info here.</p>
        <CustomerProfile customer={user} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession({req: context.req});

    if(!session) {
        return {
            redirect:{
                destination: "/",
                permanent: false
            }
        };
    }

    return {
        props: { session }
    }
}

export default Profile;
