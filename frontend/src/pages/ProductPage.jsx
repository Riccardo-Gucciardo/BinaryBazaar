import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {
  const { slug } = useParams(); // Ottieni lo slug dal parametro URL
  const [searchParams] = useSearchParams(); // Ottieni il tipo dalla query string
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const category = searchParams.get("category"); // Recupera il valore di "category" dalla query string
    axios
      .get(`http://localhost:3000/products/${slug}?category=${category}`) // Usa "category" nella query string
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.response?.data?.error || "Errore sconosciuto"));
  }, [slug, searchParams]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} className="product-image" />
      <p><strong>Modello:</strong> {product.model}</p>
      <p><strong>Prezzo:</strong> {product.discount_price || product.price} €</p>
      <p><strong>Descrizione:</strong> {product.description}</p>

      {product.details && (
        <div className="product-details">
          <h2>Dettagli</h2>
          {product.details.processor && <p><strong>Processore:</strong> {product.details.processor}</p>}
          {product.details.ram && <p><strong>RAM:</strong> {product.details.ram} GB</p>}
          {product.details.memory && <p><strong>Memoria:</strong> {product.details.memory} GB</p>}
          {product.details.video_card && <p><strong>Scheda Video:</strong> {product.details.video_card}</p>}
          {product.details.os && <p><strong>Sistema Operativo:</strong> {product.details.os}</p>}
          {product.details.year && <p><strong>Anno:</strong> {product.details.year}</p>}
          {product.details.type && <p><strong>Tipo:</strong> {product.details.type}</p>}
          {product.details.compatibility && <p><strong>Compatibilità:</strong> {product.details.compatibility}</p>}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
