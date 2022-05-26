import React, { createContext, ReactNode, useState } from 'react'
import { Phone } from '../../Model/Types'

const CartContext = createContext({
    cart: [] as Phone[],
    addCartFunction: (item: Phone) => {},
    removeCartFunction: (id: string) => {},
    clearCartFunction: () => {}
});

interface PropsType {
    children: ReactNode;
}

export const CartContextProvider: React.FC<PropsType> = (props) => {
    const [cart, setCart] = useState<any[]>([]);

    function addCartFunction(item: Phone) {
        cart.push(item);
    }
    function removeCartFunction(id: string) {
        const newCart = [] as Phone[];
        cart.map((phone: Phone) => {
            if(phone.id !== id) {
                newCart.push(phone);
            }
        })
        setCart(newCart)
    }
    function clearCartFunction() {
        setCart([]);
    }

    const context = {
        cart,
        addCartFunction,
        removeCartFunction,
        clearCartFunction
    }
  return (
    <CartContext.Provider value={context}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartContext;