import { useEffect, useState } from "react";
import axios from 'axios';
import Card from "../components/Card";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [products, setProducts] = useState([]);


    const fetchProducts = () => {
        axios.get('http://localhost:3000/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const renderLaptops = () => {
        const laptops = products.filter(product => product.category === 'laptop');
        return laptops.map((product) => (

            <Link 
                to={`/${product.slug}`} 
                key={product.product_id} 
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <Card product={product}/>

            </Link>
        ));
    };

    const renderAccessories = () => {
        const accessories = products.filter(product => product.category === 'accessory');
        return accessories.map((product) => (

            <Link 
                to={`/${product.slug}`} 
                key={product.product_id} 
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <Card product={product}/>

            </Link>
        ));
    };

    return (
        <>
            <Hero />
            <div className="container mx-auto">

                {/* <Button variant="primary" onClick={handleShow} style={{ marginBottom: '20px' }}>
                    Carrello ({cart.length})
                </Button> */}

                <h1 className="lime">laptop</h1>
                <div className="row row-cols-md-3 row-cols-lg-4 g-1">
                    {renderLaptops()}
                </div>

                <h1 className="lime">accessori</h1>

                <div className="row row-cols-md-3 row-cols-lg-4 g-1">
                    {renderAccessories()}
                </div>
            </div>

            {/* <CartOffcanvas 
                show={show} 
                handleClose={handleClose} 
                cart={cart} 
                removeFromCart={removeFromCart} 
            /> */}
        </>
    );
}