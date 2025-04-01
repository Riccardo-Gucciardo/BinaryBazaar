import { useParams, useLocation } from "react-router-dom";
import SingleCard from "../components/SingleCard";

function ProductPage() {
  const { slug } = useParams();
  const location = useLocation();
  const product = location.state?.product; 

  if (!product) return <p>Caricamento...</p>;

  return (
    <div className="product-page">
      <SingleCard product={product} type={product.category} /> 
    </div>
  );
}

export default ProductPage;
