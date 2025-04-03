import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

export default function ProductList() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            axios.get(`http://localhost:3000/products/search?q=${encodeURIComponent(searchQuery)}`)
                .then(res => setProducts(res.data))
                .catch(err => console.error('Error fetching products:', err));
        } else {
            // Fetch all products if no search query
            axios.get('http://localhost:3000/products')
                .then(res => setProducts(res.data))
                .catch(err => console.error('Error fetching products:', err));
        }
    }, [searchQuery]);

    return (
        products.map(p => {
            return (
                <Card product={p} />
            )
        })

    );
}