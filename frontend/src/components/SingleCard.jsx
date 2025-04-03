
import React from "react";
import { useCart } from "../contexts/CartContext";
// import CartOffcanvas from "./CartOffcanvas";

function SingleCard({ product }) {

    const { addToCart, showCart, handleCloseCart } = useCart();

    const {
        name,
        image_url,
        description,
        category,
        price,
        discount_price,
        details = {},
    } = product;

    return (
        <div className="product-details-container-single">
            <div className="product-grid-single">
                <div className="product-image-section-single">
                    <img
                        src={image_url || "placeholder-image.jpg"}
                        alt={name || "Prodotto senza nome"}
                        className="product-main-image-single"
                    />
                </div>

                <div className="product-info-section-single">
                    <h2 className="product-title-single">{name || "Nome non disponibile"}</h2>
                    <p className="product-brand-single">Categoria: {category || "Non specificata"}</p>
                    <hr />
                    <p className="product-description-single">{description || "Descrizione non disponibile"}</p>
                    <hr />

                    {Object.keys(details).length > 0 && (
                        <div className="product-details-section-single">
                            <h3>Dettagli del prodotto</h3>
                            <ul className="product-features-single">
                                {details.processor && <li><strong>Processore:</strong> {details.processor}</li>}
                                {details.ram && <li><strong>RAM:</strong> {details.ram} GB</li>}
                                {details.memory && <li><strong>Memoria:</strong> {details.memory} GB</li>}
                                {details.video_card && <li><strong>Scheda Video:</strong> {details.video_card}</li>}
                                {details.os && <li><strong>Sistema Operativo:</strong> {details.os}</li>}
                                {details.year && <li><strong>Anno:</strong> {details.year}</li>}
                                {details.type && <li><strong>Tipo:</strong> {details.type}</li>}
                                {details.compatibility && <li><strong>Compatibilità:</strong> {details.compatibility}</li>}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="product-purchase-section-single">
                    <div className="price-container-single">
                        {discount_price && (
                            <span className="original-price-single">
                                {price} €
                            </span>
                        )}
                        <span className="product-price-single mx-2">
                            {discount_price || price || "N/A"} €
                        </span>
                    </div>

                    <div className="purchase-actions">
                        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                            Aggiungi al carrello
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SingleCard;