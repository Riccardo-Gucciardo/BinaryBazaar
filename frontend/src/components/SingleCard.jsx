
import React from 'react';
// import './ProductDetails.css';

function SingleCard({ product }) {
  // Convertiamo il prezzo in numero e gestiamo casi invalidi
  const price = product.price ? parseFloat(product.price) : 0;
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;

  return (
    <div className="product-details-container-single">
      <div className="product-grid-single">
        <div className="product-image-section-single">
          <img 
            src={product.image_url || 'placeholder-image.jpg'} 
            alt={product.name} 
            className="product-main-image-single"
          />
        </div>

        <div className="product-info-section-single">
          <h2 className="product-title-single">{product.name}</h2>
          {/* <div className="product-rating">
            <span>★ ★ ★ ★ ☆</span>
            <span className="review-count">
              ({product.reviews?.length || 0} recensioni)
            </span>
          </div> */}
          <p className="product-brand-single">category: {product.category || 'Non specificata'}</p>
          <hr />
          <p className="product-description-single">{product.description}</p>
          <hr />
          
          {product.product_details  && (
            <ul className="product-features-single">
              {product.product_details.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="product-purchase-section-single">
          <div className="price-container-single">
            <span className="product-price-single">
              €{price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="original-price-single">
                €{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* <div className="availability">
            <span className={product.inStock ? 'in-stock' : 'out-stock'}>
              {product.inStock ? 'Disponibile' : 'Non disponibile'}
            </span>
          </div> */}

          <div className="purchase-actions">
            <button className="add-to-cart-btn">
              Aggiungi al carrello
            </button>
            <button className="buy-now-btn">
              Acquista ora
            </button>
          </div>

          <div className="shipping-info-single">
            <p>Resi gratuiti entro 30 giorni</p>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default SingleCard