import React, { createContext, useState } from 'react'

const AdminContext = createContext({
    isLogin: false,
    setLoginTrue: () => {},
    setLoginFalse: () => {}
})
interface TypeProps {
    children: React.ReactNode
}
export const AdminContextProvider: React.FC<TypeProps> = (props) => {
    const [isLogin, setIsLogin] = useState(false);

    function setLoginTrue() {
        setIsLogin(true);
    }
    function setLoginFalse() {
        setIsLogin(false);
    }
    const context = {
        isLogin,
        setLoginTrue,
        setLoginFalse
    };

  return (
    <AdminContext.Provider value={context}>
        {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContext;