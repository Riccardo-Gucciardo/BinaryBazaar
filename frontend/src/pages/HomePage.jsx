import { useEffect, useState } from "react";
import axios from 'axios';
import Card from "../components/Card";
import Hero from "../components/Hero";
import Button from 'react-bootstrap/Button';
import CartOffcanvas from "../components/CartOffcanvas";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);

    const fetchProducts = () => {
        axios.get('http://localhost:3000/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        setShow(true);
        console.log("Prodotto aggiunto:", product);
    };

    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
        console.log("Prodotto rimosso dall'indice:", indexToRemove);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderLaptops = () => {
        const laptops = products.filter(product => product.category === 'laptop');
        return laptops.map((product) => (
            <Link 
                to={`/${product.slug}?category=${product.category}`} 
                key={product.product_id} 
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <Card product={product} addToCart={addToCart} />
            </Link>
        ));
    };

    const renderAccessories = () => {
        const accessories = products.filter(product => product.category === 'accessory');
        return accessories.map((product) => (
            <Link 
                to={`/${product.slug}?category=${product.category}`} 
                key={product.product_id} 
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <Card product={product} addToCart={addToCart} />
            </Link>
        ));
    };

    return (
        <>
            <Hero />
            <div className="container mx-auto">
                <Button variant="primary" onClick={handleShow} style={{ marginBottom: '20px' }}>
                    Carrello ({cart.length})
                </Button>

                <h1 className="lime">laptop</h1>
                <div className="row row-cols-md-3 row-cols-lg-4 g-1">
                    {renderLaptops()}
                </div>

                <h1 className="lime">accessori</h1>
                <div className="row row-cols-md-3 row-cols-lg-4 g-1">
                    {renderAccessories()}
                </div>
            </div>

            <CartOffcanvas 
                show={show} 
                handleClose={handleClose} 
                cart={cart} 
                removeFromCart={removeFromCart} 
            />
        </>
    );
}