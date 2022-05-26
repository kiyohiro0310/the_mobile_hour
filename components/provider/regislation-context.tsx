import React, { createContext, useState } from 'react'

const RegislationContext = createContext({
    isLogin: false,
    isSignup: false,
    setLogin: () => {},
    setSignup: () => {}

})
interface TypeProps {
    children: React.ReactNode
}
export const RegislationContextProvider: React.FC<TypeProps> = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    function setLoginHandler() {
        setIsLogin(prevState => !prevState)
        setIsSignup(false);
    }
    function setSignupHandler() {
        setIsSignup(prevState => !prevState);
        setIsLogin(false);
    }
    const context = {
        isLogin: isLogin,
        isSignup: isSignup,
        setLogin: setLoginHandler,
        setSignup: setSignupHandler
    };

  return (
    <RegislationContext.Provider value={context}>
        {props.children}
    </RegislationContext.Provider>
  )
}

export default RegislationContext;