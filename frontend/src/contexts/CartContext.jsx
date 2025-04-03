import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        setShowCart(true);
    };

    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
    };

    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, showCart, handleCloseCart, handleShowCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}