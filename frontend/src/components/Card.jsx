
export default function Card({ product, addToCart }) {
    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

import { Link } from "react-router-dom";


    return (

        <div className="box-card">
            <div className="product-card">
                <img src={product.image_url} alt="Product Image" className="product-image" />
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-model"><strong>Modello: </strong>{product.model}</p>
                    <p className="product-price">
                        Prezzo:{' '}
                        {product.discount_price ? (
                            <>
                                <span className="original-price">{product.price}</span>
                                <span
                                    className="discount-price"
                                    style={{ color: 'black', fontWeight: 'bold' }}
                                >
                                    {product.discount_price}
                                </span>
                            </>
                        ) : (
                            <span className="normal-price" style={{ color: 'black' }}>
                                {product.price}
                            </span>
                        )}
                    </p>
                    {/* <button className="buy-button" onClick={handleAddToCart}>
                        Aggiungi al carrello
                    </button> */}

                </div>
            </div>
        </div>
    );

}




