import { useParams, } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "../components/SingleCard";

function ProductPage() {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      const category = searchParams.get("category");
        axios
            .get(`http://localhost:3000/products/${slug}?category=${category}`)
            .then((res) => setProduct(res.data))
            .catch((err) => setError(err.response?.data?.error || "Errore sconosciuto"));
    }, [slug]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div>Caricamento...</div>;
    }

    return <SingleCard product={product} />;
}

export default ProductPage;

//   return (
//     // <div className="product-detail">
//     //   <h1>{product.name}</h1>
//     //   <img src={product.image_url} alt={product.name} className="product-image" />
//     //   <p><strong>Modello:</strong> {product.model}</p>
//     //   <p><strong>Prezzo:</strong> {product.discount_price || product.price} €</p>
//     //   <p><strong>Descrizione:</strong> {product.description}</p>

//     //   {product.details && (
//     //     <div className="product-details">
//     //       <h2>Dettagli</h2>
//     //       {product.details.processor && <p><strong>Processore:</strong> {product.details.processor}</p>}
//     //       {product.details.ram && <p><strong>RAM:</strong> {product.details.ram} GB</p>}
//     //       {product.details.memory && <p><strong>Memoria:</strong> {product.details.memory} GB</p>}
//     //       {product.details.video_card && <p><strong>Scheda Video:</strong> {product.details.video_card}</p>}
//     //       {product.details.os && <p><strong>Sistema Operativo:</strong> {product.details.os}</p>}
//     //       {product.details.year && <p><strong>Anno:</strong> {product.details.year}</p>}
//     //       {product.details.type && <p><strong>Tipo:</strong> {product.details.type}</p>}
//     //       {product.details.compatibility && <p><strong>Compatibilità:</strong> {product.details.compatibility}</p>}
//     //     </div>
//     //   )}
//     // </div>

//     <SingleCard product={product} />

//   );
// }

// export default ProductPage;
