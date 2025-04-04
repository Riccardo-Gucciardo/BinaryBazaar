import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

export default function ProductList() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const [products, setProducts] = useState([]);
    const [viewMode, setViewMode] = useState('single'); // 'single' o 'row'
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'name'
    });

    useEffect(() => {
        let params = {};

        if (searchQuery) params.q = searchQuery;
        if (filters.category) params.category = filters.category;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.sortBy) params.sortBy = filters.sortBy;

        axios.get('http://localhost:3000/products', { params })
            .then(res => setProducts(res.data))
            .catch(err => console.error('Error:', err));
    }, [searchQuery, filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="product-list-container">
            {/* Controlli */}
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
                        <option value="laptop">laptop</option>
                        <option value="Accessory">Accessory</option>
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
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>
            </div>

            {/* Griglia Prodotti */}
            <div className={`products-grid ${viewMode}`}>
                {
                    (viewMode == 'single')
                        ? (products.map(p => <Link to={`/${p.slug}`}><Card key={p.id} product={p}></Card></Link>))
                        : (products.map(p => <li key={p.id}><Link to={`/${p.slug}`}>{p.name}</Link></li>))

                }
            </div>
        </div>
    );
}