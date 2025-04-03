// CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    // Initialize cart from localStorage if it exists
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [showCart, setShowCart] = useState(false);

    const addToCart = (item) => {
        setCart(prevCart => [...prevCart, item]);
    };

    const removeFromCart = (index) => {
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
    };

    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart,
            removeFromCart, 
            showCart, 
            handleCloseCart, 
            handleShowCart 
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);