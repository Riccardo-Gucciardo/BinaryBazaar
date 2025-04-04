import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

export default function ProductList() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');
    const [products, setProducts] = useState([]);
    const [viewMode, setViewMode] = useState('single');
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'name-asc',
        discounted: false
    });

    useEffect(() => {
        let url = 'http://localhost:3000/products/s';
        let params = {};

        if (searchQuery) {
            params.q = searchQuery;
        }
        if (filters.category) {
            params.category = filters.category;
        }
        if (filters.minPrice) {
            params.minPrice = filters.minPrice;
        }
        if (filters.maxPrice) {
            params.maxPrice = filters.maxPrice;
        }
        if (filters.sortBy) {
            params.sortBy = filters.sortBy;
        }
        if (filters.discounted) {
            params.discounted = filters.discounted;
        }

        axios
            .get(url, { params })
            .then((res) => setProducts(res.data))
            .catch((err) => console.error('Error fetching products:', err));
    }, [searchQuery, filters]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="product-list-container">
            <div className="controls">
                <div className="view-toggle">
                    <button
                        onClick={() => setViewMode('single')}
                        className={viewMode === 'single' ? 'active' : ''}
                    >
                        Single View
                    </button>
                    <button
                        onClick={() => setViewMode('row')}
                        className={viewMode === 'row' ? 'active' : ''}
                    >
                        Row View
                    </button>
                </div>

                <div className="filters">
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Categories</option>
                        <option value="laptop">Laptop</option>
                        <option value="accessory">Accessory</option>
                    </select>
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                    />
                    <select
                        name="sortBy"
                        value={filters.sortBy}
                        onChange={handleFilterChange}
                    >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                    <label>
                        <input
                            type="checkbox"
                            name="discounted"
                            checked={filters.discounted}
                            onChange={handleFilterChange}
                        />
                        Solo Prodotti Scontati
                    </label>
                </div>
            </div>

            <div className="results-count">
                <p>Trovati {products.length} prodotti</p>
            </div>

            <div className={`products-grid ${viewMode}`}>
                {viewMode === 'single' ? (
                    products.map((p) => (
                        <Link to={`/${p.slug}`} key={p.slug}>
                            <Card product={p} />
                        </Link>
                    ))
                ) : (
                    <ul>
                        {products.map((p) => (
                            <li key={p.slug}>
                                <Link to={`/${p.slug}`}>{p.name}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}