
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'

// function SearchBar() {
//     const [products, setProducts] = useState([])
//     const [search, setSearch] = useState("");
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('http://localhost:3000/products')
//             .then(res => setProducts(res.data))
//             .catch(err => console.error(err))
//     }, []);

//     const handleChange = (e) => {
//         const value = e.target.value;
//         setSearch(value);
//         setFilteredProducts(value.length > 0
//             ? products.filter((product) =>
//                 product.name.toLowerCase().includes(value.toLowerCase()))
//             : []);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (search.trim() !== "") {
//             const selectedProduct = products.find(
//                 (product) => product.name.toLowerCase() === search.toLowerCase()
//             );
//             if (selectedProduct) {
//                 navigate(`/product/${selectedProduct.slug}`);
//             }
//         }
//     };

//     const handleSelect = (product) => {
//         setSearch(product.name);
//         setFilteredProducts([]);
//         navigate(`/product/${product.slug}`);
//     };

//     return (
//         <div className="search-bar">
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={search}
//                     onChange={handleChange}
//                     placeholder="Cerca un prodotto..."
//                 />
//                 <button type="submit">Cerca</button>
//             </form>

//             {filteredProducts.length > 0 && (
//                 <ul className="search-results">
//                     {filteredProducts.map((product) => (
//                         <li key={product.product_id} onClick={() => handleSelect(product)}>
//                             {product.name}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     )
// }

// function ProductsList({ products }) {
//     return (
//         <div className="products-list">
//             <h2>Lista Prodotti</h2>
//             <ul>
//                 {products.map((product) => (
//                     <li key={product.product_id}>{product.name} - {product.price}€</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// // Esportiamo entrambi i componenti
// export { SearchBar, ProductsList };
