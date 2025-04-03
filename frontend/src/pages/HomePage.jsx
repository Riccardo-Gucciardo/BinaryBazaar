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

    // Funzione per filtrare e mappare i laptop
    const renderLaptops = () => {
        const laptops = products.filter(product => product.category === 'laptop');
        return laptops.map((product) => (
            <Link to={`/${product.slug}`} key={product.product_id}> {/* Rimosso ?category */}
                <Card product={product} />
            </Link>
        ));
    };

    // Funzione per filtrare e mappare gli accessori
    const renderAccessories = () => {
        const accessories = products.filter(product => product.category === 'accessory');
        return accessories.map((product) => (
            <Link to={`/${product.slug}`} key={product.product_id}> {/* Rimosso ?category */}
                <Card product={product} />
            </Link>
        ));
    };

    return (
        <>
            <Hero />
            <div className="container mx-auto">
                <h1 className="lime">Laptop</h1>
                <div className="row row-cols-md-3 row-cols-lg-4 g-1">
                    {renderLaptops()}
                </div>
                <h1 className="lime">Accessori</h1>
                <div className="row row-cols-md-3 row-cols-lg-4 g-1">
                    {renderAccessories()}
                </div>
            </div>
        </>
    );
}