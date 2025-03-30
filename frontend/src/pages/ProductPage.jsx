import { useParams } from "react-router-dom";

function ProductPage() {
  const { slug } = useParams();

  return (
    <div>
      <h1>Dettagli del prodotto</h1>
      <p>Hai selezionato il prodotto: {slug}</p>
    </div>
  );
}

export default ProductPage;