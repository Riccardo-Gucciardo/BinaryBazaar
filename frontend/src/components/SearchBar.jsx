import axios from "axios"
import { useState } from "react";

const [productsList, setProductsList] = useState([])

function cerca () {
  
  axios.get('http://localhost:3000/products')

  

}   

function SearchBar() {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = () => {
    const filtered = productsList.filter((product) =>
      product.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="search-block">
      <h1 className="search-block__title">Scegli il tuo prodotto</h1>
      <div className="search-block__body">
        <div className="search-block__wrap-input">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tuo prodotto"
            className="search-block__input"
          />
          <div className="btn-box">
            <button onClick={handleSearch}>Cerca</button>
          </div>
        </div>

        <ul className="search-block__products">
          {filteredProducts.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
          {filteredProducts.length === 0 && search !== "" && (
            <li>Nessun prodotto trovato</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
