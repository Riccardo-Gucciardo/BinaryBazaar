import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [productsList, setProductsList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Quando il componente si carica, prende i prodotti
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProductsList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filtered = productsList.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/product/${search}`);
    }
  };

  const handleSelect = (productName) => {
    setSearch(productName);
    setFilteredProducts([]);
    navigate(`/product/${productName}`);
  };

  return (
    <div className="search-block">
      <h1 className="search-block__title">Scegli il tuo prodotto</h1>
      <form onSubmit={handleSubmit}>
        <div className="search-block__wrap-input">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Tuo prodotto"
            className="search-block__input"
          />
          <div className="btn-box">
            <button type="submit">Cerca</button>
          </div>
        </div>
      </form>

      {filteredProducts.length > 0 && (
        <ul className="search-block__products">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelect(product.name)}
              style={{ cursor: "pointer" }}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
