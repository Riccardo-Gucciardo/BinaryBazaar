import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { useCart } from "../contexts/CartContext";

export default function CartOffcanvas() {
    const { cart, removeFromCart, showCart, handleCloseCart } = useCart();

    return (
        <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrello</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cart.length === 0 ? (
                    <p>Il carrello è vuoto.</p>
                ) : (
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
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}