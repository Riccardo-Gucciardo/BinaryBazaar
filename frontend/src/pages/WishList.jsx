// WishList.jsx
import React from "react";
import { useWishlist } from "../contexts/WishlistContext";

export default function WishList() {
    const { wishlist, removeFromWishlist } = useWishlist();

    console.log("Wishlist corrente:", wishlist); // Debug

    return (
        <div className="wishlist-container">
            <h1>I miei prodotti preferiti</h1>
            {wishlist.length === 0 ? (
                <p>La tua wishlist è vuota</p>
            ) : (
                <div className="wishlist-items">
                    {wishlist.map((product) => (
                        <div key={product.id} className="wishlist-card">
                            <div className="wishlist-card-content">
                                <img
                                    src={product.image_url || "placeholder-image.jpg"}
                                    alt={product.name}
                                    className="wishlist-item-image"
                                />
                                <div className="wishlist-item-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.category}</p>
                                    <p className="wishlist-price">
                                        {product.discount_price || product.price} €
                                    </p>
                                </div>
                                <button
                                    className="remove-wishlist-btn"
                                    onClick={() => removeFromWishlist(product.id)}
                                >
                                    Rimuovi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}