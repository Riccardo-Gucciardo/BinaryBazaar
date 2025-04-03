
// import React from 'react';
// // import './ProductDetails.css';

// function SingleCard({ product }) {
//   // Convertiamo il prezzo in numero e gestiamo casi invalidi
//   const price = product.price ? parseFloat(product.price) : 0;
//   const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;

//   return (
//     <div className="product-details-container-single">
//       <div className="product-grid-single">
//         <div className="product-image-section-single">
//           <img 
//             src={product.image_url || 'placeholder-image.jpg'} 
//             alt={product.name} 
//             className="product-main-image-single"
//           />
//         </div>

//         <div className="product-info-section-single">
//           <h2 className="product-title-single">{product.name}</h2>
//           {/* <div className="product-rating">
//             <span>★ ★ ★ ★ ☆</span>
//             <span className="review-count">
//               ({product.reviews?.length || 0} recensioni)
//             </span>
//           </div> */}
//           <p className="product-brand-single">category: {product.category || 'Non specificata'}</p>
//           <hr />
//           <p className="product-description-single">{product.description}</p>
//           <hr />

//           {product.product_details  && (
//             <ul className="product-features-single">
//               {product.product_details.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="product-purchase-section-single">
//           <div className="price-container-single">
//             <span className="product-price-single">
//               €{price.toFixed(2)}
//             </span>
//             {originalPrice && (
//               <span className="original-price-single">
//                 €{originalPrice.toFixed(2)}
//               </span>
//             )}
//           </div>

//           {/* <div className="availability">
//             <span className={product.inStock ? 'in-stock' : 'out-stock'}>
//               {product.inStock ? 'Disponibile' : 'Non disponibile'}
//             </span>
//           </div> */}

//           <div className="purchase-actions">
//             <button className="add-to-cart-btn">
//               Aggiungi al carrello
//             </button>
//             <button className="buy-now-btn">
//               Acquista ora
//             </button>
//           </div>

//           <div className="shipping-info-single">
//             <p>Resi gratuiti entro 30 giorni</p>
//           </div>
//         </div>
//       </div>


//     </div>
//   );
// }

// export default SingleCard
import React from "react";
import { useCart } from "../contexts/CartContext";
import CartOffcanvas from "./CartOffcanvas";

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
                        <span className="product-price-single">
                            €{discount_price || price || "N/A"}
                        </span>
                        {discount_price && (
                            <span className="original-price-single">
                                €{price}
                            </span>
                        )}
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