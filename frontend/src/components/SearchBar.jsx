import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchBar() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showDatalist, setShowDatalist] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Sposta la fetch in useEffect per evitare chiamate multiple
        axios.get("http://localhost:3000/products") //fix deve cambiare questo endpoint!!!
            .then(res => setProducts(res.data))
            .catch(err => console.error('Errore nel caricamento prodotti:', err));
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
        setShowDatalist(e.target.value.length > 0);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigateToProduct();
        }
    };

    const handleClickButton = (e) => {
        e.preventDefault();
        navigateToProduct();
    };

    const navigateToProduct = () => {
        // Trova il prodotto che corrisponde al nome
        const selectedProduct = products.find(product => product.name.toLowerCase() === search.toLowerCase());

        if (selectedProduct) {
            navigate(`/${selectedProduct.slug}`);
            // Resetta la ricerca
            setSearch("");
            setShowDatalist(false);
        }
    };

    return (
        <div style={{ position: "relative", width: "500px", margin: "auto" }}>
            <div className="searchBox" style={{ height: "60px", padding: "5px 10px" }}>
                <form style={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <input
                        className="searchInput"
                        type="text"
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search something"
                        list="product-list"
                        style={{ flex: 1, height: "50px", fontSize: "18px" }}
                    />
                    {/* Mostra il Datalist con le opzioni */}
                    {showDatalist && (
                        <datalist id="product-list">
                            {products
                                .filter(product => product.name.toLowerCase().includes(search.toLowerCase())) // Filtra prodotti in base alla ricerca
                                .map((product) => (
                                    <option key={product.product_id} value={product.name} />
                                ))}
                        </datalist>
                    )}
                    {/* Bottone originale con funzione di navigazione */}
                    <button type="submit" className="searchButton" style={{ width: "45px", height: "45px" }} onClick={handleClickButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                            <g clipPath="url(#clip0_2_17)">
                                <g filter="url(#filter0_d_2_17)">
                                    <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
