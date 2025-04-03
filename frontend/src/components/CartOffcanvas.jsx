import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { useCart } from "../contexts/CartContext";
import { useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

export default function CartOffcanvas() {
    const { cart, removeFromCart, showCart, handleCloseCart } = useCart();

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = item.discount_price || item.price;
            return total + parseFloat(price);
        }, 0).toFixed(2);
    };

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrello</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cart.length === 0 ? (
                    <p>Il carrello è vuoto.</p>
                ) : (
                    <>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {cart.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <span>
                                        {item.name} - €{item.discount_price || item.price}
                                    </span>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(index)}
                                    >
                                        Rimuovi
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: "20px", borderTop: "1px solid #dee2e6", paddingTop: "10px" }}>
                            <h5>Totale: {calculateTotal()} €</h5>
                            <Link to="/checkout">
                                <Button
                                    variant="success"
                                    onClick={handleCloseCart}
                                    style={{ width: "100%", marginTop: "10px" }}
                                >
                                    Procedi al Pagamento
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}