import { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";
import axios from 'axios'

export default function SearchBar() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Sposta la fetch in useEffect per evitare chiamate multiple
        axios.get('http://localhost:3000/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Errore nel caricamento prodotti:', err));
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        // Migliora la logica di filtro
        if (value.trim().length > 0) {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(value.toLowerCase()) ||
                product.description.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered.slice(0, 5)); // Limita i risultati a 5
        } else {
            setFilteredProducts([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (filteredProducts.length > 0) {
            handleSelect(filteredProducts[0]); // Seleziona il primo risultato
        }
    };

    const handleSelect = (product) => {
        setSearch("");
        setFilteredProducts([]);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Cerca un prodotto..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Cerca</button>
            </form>

            {filteredProducts.length > 0 && (
                <ul className="search-results">
                    {filteredProducts.map((product) => (
                        <li
                            key={product.product_id}
                            onClick={() => handleSelect(product)}
                            className="search-result-item"
                        >
                            <Link to={`/${product.slug}/?category=${product.category}`} >{product.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}