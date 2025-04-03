// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SearchBar() {
//     const [products, setProducts] = useState([]);
//     const [search, setSearch] = useState("");
//     const [showDatalist, setShowDatalist] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Sposta la fetch in useEffect per evitare chiamate multiple
//         axios.get(`http://localhost:3000/search?name=${search}`) //fix deve cambiare questo endpoint!!!
//             .then(res => setProducts(res.data))
//             .catch(err => console.error('Errore nel caricamento prodotti:', err));
//     }, [search]);

//     // useEffect(() => {
//     //     if (search.trim()) {  // Fai la chiamata solo se c'è un testo da cercare
//     //         axios.get(`http://localhost:3000/search?name=${search}`)  // Cambiato l'endpoint
//     //             .then(res => setProducts(res.data))
//     //             .catch(err => console.error('Errore nel caricamento prodotti:', err));
//     //     } else {
//     //         setProducts([]); // Pulisci i risultati se non c'è testo
//     //     }
//     // }, [search]); // Aggiungi search come dipendenza

//     const handleChange = (e) => {
//         setSearch(e.target.value);
//         setShowDatalist(e.target.value.length > 0);
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             navigateToProduct();
//         }
//     };

//     const handleClickButton = (e) => {
//         e.preventDefault();
//         navigateToProduct();
//     };

//     const navigateToProduct = () => {
//         // Trova il prodotto che corrisponde al nome
//         const selectedProduct = products.find(product => product.name.toLowerCase() === search.toLowerCase());

//         if (selectedProduct) {
//             navigate(`/${selectedProduct.slug}`);
//             // Resetta la ricerca
//             setSearch("");
//             setShowDatalist(false);
//         }
//     };

//     return (
//         <div style={{ position: "relative", width: "500px", margin: "auto" }}>
//             <div className="searchBox" style={{ height: "60px", padding: "5px 10px" }}>
//                 <form style={{ display: "flex", alignItems: "center", width: "100%" }}>
//                     <input
//                         className="searchInput"
//                         type="text"
//                         value={search}
//                         onChange={handleChange}
//                         onKeyDown={handleKeyDown}
//                         placeholder="Search something"
//                         list="product-list"
//                         style={{ flex: 1, height: "50px", fontSize: "18px" }}
//                     />
//                     {/* Mostra il Datalist con le opzioni */}
//                     {showDatalist && (
//                         <datalist id="product-list">
//                             {products
//                                 .filter(product => product.name.toLowerCase().includes(search.toLowerCase())) // Filtra prodotti in base alla ricerca
//                                 .map((product) => (
//                                     <option key={product.product_id} value={product.name} />
//                                 ))}
//                         </datalist>
//                     )}
//                     {/* Bottone originale con funzione di navigazione */}
//                     <button type="submit" className="searchButton" style={{ width: "45px", height: "45px" }} onClick={handleClickButton}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
//                             <g clipPath="url(#clip0_2_17)">
//                                 <g filter="url(#filter0_d_2_17)">
//                                     <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges"></path>
//                                 </g>
//                             </g>
//                         </svg>
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchBar() {
    const [products, setProducts] = useState([]); // Stato per i prodotti restituiti dall'endpoint
    const [search, setSearch] = useState(""); // Stato per il testo della searchbar
    const [showDatalist, setShowDatalist] = useState(false); // Stato per mostrare/nascondere il datalist
    const navigate = useNavigate();

    // useEffect per fare la chiamata API quando il valore di search cambia
    useEffect(() => {
        // Fai la chiamata solo se c'è un testo da cercare (almeno 1 carattere)
        if (search.trim().length > 0) {
            // Chiamata all'endpoint /search con il parametro name
            axios
                .get("http://localhost:3000/search", {
                    params: {
                        name: search, // Passa il valore di search come parametro name
                    },
                })
                .then((res) => {
                    setProducts(res.data); // Aggiorna lo stato con i prodotti restituiti
                    setShowDatalist(res.data.length > 0); // Mostra il datalist solo se ci sono risultati
                })
                .catch((err) => {
                    console.error("Errore nel caricamento prodotti:", err);
                    setProducts([]); // In caso di errore, pulisci i risultati
                    setShowDatalist(false); // Nascondi il datalist
                });
        } else {
            setProducts([]); // Pulisci i risultati se la searchbar è vuota
            setShowDatalist(false); // Nascondi il datalist
        }
    }, [search]); // Dipendenza: il useEffect si attiva quando search cambia

    // Gestisce il cambiamento del testo nella searchbar
    const handleChange = (e) => {
        setSearch(e.target.value); // Aggiorna il valore della searchbar
    };

    // Gestisce la pressione del tasto Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigateToProduct();
        }
    };

    // Gestisce il click sul bottone di ricerca
    const handleClickButton = (e) => {
        e.preventDefault();
        navigateToProduct();
    };

    // Funzione per navigare alla pagina del prodotto selezionato
    const navigateToProduct = () => {
        // Trova il prodotto che corrisponde esattamente al nome inserito o selezionato
        const selectedProduct = products.find(
            (product) => product.name.toLowerCase() === search.toLowerCase()
        );

        if (selectedProduct) {
            navigate(`/${selectedProduct.slug}`); // Naviga alla pagina del prodotto
            setSearch(""); // Resetta la searchbar
            setShowDatalist(false); // Nascondi il datalist
            setProducts([]); // Pulisci i risultati
        } else if (search.trim().length > 0) {
            // Se non c'è un prodotto esatto, logga un messaggio
            console.log("Nessun prodotto trovato con questo nome esatto");
            // Opzionale: navigate(`/search-results?name=${search}`);
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
                            {products.map((product) => (
                                <option key={product.slug} value={product.name} />
                            ))}
                        </datalist>
                    )}
                    {/* Bottone di ricerca */}
                    <button
                        type="submit"
                        className="searchButton"
                        style={{ width: "45px", height: "45px" }}
                        onClick={handleClickButton}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_2_17)">
                                <g filter="url(#filter0_d_2_17)">
                                    <path
                                        d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        shapeRendering="crispEdges"
                                    />
                                </g>
                            </g>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}