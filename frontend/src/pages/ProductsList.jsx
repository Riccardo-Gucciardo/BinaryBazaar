import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';


export default function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [viewMode, setViewMode] = useState('single'); // Inizia con "single" (spento)

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sortBy: searchParams.get('sortBy') || 'name-asc',
        discounted: searchParams.get('discounted') === 'true' || false,
    });

    useEffect(() => {
        let url = 'http://localhost:3000/products/s';
        let params = {};

        if (searchQuery) params.q = searchQuery;
        if (filters.category) params.category = filters.category;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.sortBy) params.sortBy = filters.sortBy;
        if (filters.discounted) params.discounted = filters.discounted;

        axios
            .get(url, { params })
            .then((res) => setProducts(res.data))
            .catch((err) => console.error('Error fetching products:', err));
    }, [searchQuery, filters]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newFilters = {
            ...filters,
            [name]: type === 'checkbox' ? checked : value,
        };
        setFilters(newFilters);

        const newParams = {};
        if (searchQuery) newParams.q = searchQuery;
        if (newFilters.category) newParams.category = newFilters.category;
        if (newFilters.minPrice) newParams.minPrice = newFilters.minPrice;
        if (newFilters.maxPrice) newParams.maxPrice = newFilters.maxPrice;
        if (newFilters.sortBy) newParams.sortBy = newFilters.sortBy;
        if (newFilters.discounted) newParams.discounted = newFilters.discounted;
        setSearchParams(newParams);
    };

    // Gestisci il cambio dello switch
    const handleViewToggle = (e) => {
        setViewMode(e.target.checked ? "row" : "single");
    };

    return (
        <div className="product-list-container">
            <div className="controls">
                <div className="view-toggle">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={viewMode === "row"} // Acceso per "row", spento per "single"
                            onChange={handleViewToggle}
                        />
                        <div className="slider">
                            <div className="circle">
                                <svg
                                    className="cross"
                                    xml:space="preserve"
                                    style={{ enableBackground: "new 0 0 512 512" }}
                                    viewBox="0 0 365.696 365.696"
                                    y="0"
                                    x="0"
                                    height="6"
                                    width="6"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g>
                                        <path
                                            fill="currentColor"
                                            d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
                                        />
                                    </g>
                                </svg>
                                <svg
                                    className="checkmark"
                                    xml:space="preserve"
                                    style={{ enableBackground: "new 0 0 512 512" }}
                                    viewBox="0 0 24 24"
                                    y="0"
                                    x="0"
                                    height="10"
                                    width="10"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g>
                                        <path
                                            fill="currentColor"
                                            d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </label>
                    <span style={{ marginLeft: "10px" }}>
                        {viewMode === "single" ? "Single View" : "Row View"}
                    </span>
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

