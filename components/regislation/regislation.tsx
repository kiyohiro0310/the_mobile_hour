import { NextPage } from 'next';
import React, { FormEvent, useContext, useRef, useState } from 'react'
import classes from "./regislation.module.scss"
import Image from "next/image"
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from 'next/router';
import { CustomerType } from '../../Model/Types';
import { hashPassword } from '../../lib/auth';
import NotificationContext from '../provider/notification-context';
import RegislationContext from '../provider/regislation-context';

interface TypeProps {
  isLogin: boolean,
  isSignup: boolean
}

type resultType = SignInResponse | undefined;


async function createUser(user: CustomerType){
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}

const Regislation: NextPage<TypeProps> = (props) => {
    const notificationCtx = useContext(NotificationContext);
    const regislationCtx = useContext(RegislationContext);

    const [isLogin, setIsLogin] = useState(props.isLogin);
    const [isSignup, setIsSignup] = useState(props.isSignup);

    const emailRef = React.createRef<HTMLInputElement>()
    const passwordRef = React.createRef<HTMLInputElement>()
    const firstnameRef = React.createRef<HTMLInputElement>()
    const lastnameRef = React.createRef<HTMLInputElement>()
    const phoneRef = React.createRef<HTMLInputElement>()
    const addressRef = React.createRef<HTMLInputElement>()
    const cityRef = React.createRef<HTMLInputElement>()
    const stateRef = React.createRef<HTMLInputElement>()
    const postcodeRef = React.createRef<HTMLInputElement>()
    const passwordConfirmRef = React.createRef<HTMLInputElement>()

    function setLoginFunction() {
      if(!isLogin){
        regislationCtx.setLogin();
      }
      if(!isSignup){
        regislationCtx.setSignup();
      }
    }

    function setFalse() {
      if(isLogin){
        regislationCtx.setLogin();
      }
      if(isSignup){
        regislationCtx.setSignup();
      }
    }

    async function submitHandler(e: FormEvent) {
        e.preventDefault();

        if(isLogin && !isSignup) {
          setFalse();
          const enteredEmail = emailRef.current!.value;
          const enteredPassword = passwordRef.current!.value;

          const result: resultType = await signIn("credentials", {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword
          });


          if(result!.error) {
            notificationCtx.showNotification({
              title: "Error",
              message: "Login failed.",
              status: "error"
            });

          }else{
            notificationCtx.showNotification({
              title: "Success",
              message: "Login successfully",
              status: "success"
            });
            setIsLogin(prevState => !prevState);
          }

        }else{
          setFalse();
          try {
            const enteredEmail = emailRef.current!.value;
            const enteredPassword = passwordRef.current!.value;
            const enteredFirstname = firstnameRef.current!.value;
            const enteredLastname = lastnameRef.current!.value;
            const enteredPhone = phoneRef.current!.value;
            const enteredAddress = addressRef.current!.value;
            const enteredCity = cityRef.current!.value;
            const enteredPostcode = Number(postcodeRef.current!.value);
            const enteredState = stateRef.current!.value;
            const enteredPasswordConfirm = passwordConfirmRef.current!.value;


            if(enteredPassword !== enteredPasswordConfirm) {
              throw new Error("Password is wrong.")
            }
            const hashedPassword = await hashPassword(enteredPassword);

            const newUser = {
              firstname: enteredFirstname,
              lastname: enteredLastname,
              phone: enteredPhone,
              email: enteredEmail,
              address: enteredAddress,
              city: enteredCity,
              postcode: enteredPostcode,
              state: enteredState,
              password: hashedPassword
            }

            const data = await createUser(newUser)
            console.log(data);

            if(data.fieldCount > 0) {
              notificationCtx.showNotification({
                title: "Success",
                message: "Create account successfully",
                status: "success"
              });
              setIsSignup(false);
              setIsLogin(true);
            }else{
              notificationCtx.showNotification({
                title: "Error",
                message: "Create account failed.",
                status: "error"
              });
            }

          } catch(error) {
            console.log(error);
            notificationCtx.showNotification({
              title: "Error",
              message: "Create account failed.",
              status: "error"
            });

          }
        }
    }

  return (
    <div>
      <div className={classes.container}>
      {isLogin && !isSignup && (
        <div>
          <div className={classes.close} onClick={setFalse}>
            <Image src="/images/home/close.png" alt="close image" width={18} height={18} />
          </div>
          <h1>Login</h1>
          <form onSubmit={submitHandler} className={classes.login_form}>
            <div>
              <input type="email" name='mail' id='mail' placeholder='Email' required ref={emailRef} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
              <span className={classes.input_validation}>Invalid input.</span>
            </div>
            <div>
              <input type="password" name='password' id='password' placeholder='Password' required ref={passwordRef}/>
              <span className={classes.input_validation}>Invalid input.</span>
            </div>

              <input type="submit" value="Login" className={classes.submit_button}/>
          </form>
          <p onClick={setLoginFunction}>Create account?</p>
        </div>
      )}
      {isSignup && !isLogin && (
        <div>
          <div className={classes.close} onClick={setFalse}>
            <Image src="/images/home/close.png" alt="close image" width={18} height={18} />
          </div>

          <h1>Create account</h1>
          <form onSubmit={submitHandler} className={classes.create_form}>
            <div>
              <div>
                <input type="text" placeholder='First Name' required ref={firstnameRef} pattern="[a-zA-z]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
              <div>
                <input type="text" placeholder='Last Name' required ref={lastnameRef} pattern="[a-zA-z]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
            </div>
            <div>
              <div>
                <input type="tel" placeholder='Phone' required ref={phoneRef} pattern="[0-9]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
              <div>
                <input type="email" placeholder='Email' required ref={emailRef} pattern="[a-zA-z]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
            </div>
            <div>
              <div>
                <input type="text" placeholder='Address' required ref={addressRef} pattern="^(?!^ +$)([\w -&]+)$"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
              <div>
                <input type="text" placeholder='Postcode' required ref={postcodeRef} pattern="[0-9]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
            </div>
            <div>
              <div>
                <input type="text" placeholder='City' required ref={cityRef} pattern="[a-zA-z]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
              <div>
                <input type="text" placeholder='State' required ref={stateRef} pattern="[0-9]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
            </div>
            <div>
              <div>
                <input type="password" placeholder='Password' required ref={passwordRef}/>
              </div>
              <div>
                <input type="password" placeholder='Confirm password' required ref={passwordConfirmRef}/>
              </div>
            </div>

              <input type="submit" value="Create" className={classes.submit_button}/>
          </form>
          <p onClick={setLoginFunction}>Login with existing account?</p>
        </div>
      )}
      </div>
      <div className={classes.background}></div>
    </div>
  )
}

export default Regislation