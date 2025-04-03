import { useCart } from "../contexts/CartContext";
import { Container, Row, Col, Card, ListGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckOut() {
    const { cart, resetCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        telephone: "",
        promotionCode: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const total = cart.reduce((sum, item) => {
        return sum + parseFloat(item.discount_price || item.price);
    }, 0).toFixed(2);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.firstName) tempErrors.firstName = "Il nome è obbligatorio";
        if (!formData.lastName) tempErrors.lastName = "Il cognome è obbligatorio";
        if (!formData.email) tempErrors.email = "L'email è obbligatoria";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email non valida";
        if (!formData.address) tempErrors.address = "L'indirizzo è obbligatorio";
        if (!formData.city) tempErrors.city = "La città è obbligatoria";
        if (!formData.telephone) tempErrors.telephone = "Il telefono è obbligatorio";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        const orderData = {
            name: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            telephone: formData.telephone,
            promotion_code: formData.promotionCode || null,
            products: cart.map(item => ({
                slug: item.slug, // Usa slug invece di product_id
                quantity: 1,
                price: item.discount_price || item.price,
                name: item.name
            })),
            total: total
        };

        axios
            .post("http://localhost:3000/orders", orderData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                console.log("Ordine creato:", response.data);
                alert("Ordine creato con successo!");
                navigate("/allDone", { state: { orderId: response.data.orderId } });
            })
            .catch((error) => {
                console.error("Errore:", error.response ? error.response.data : error.message);
                alert("Errore: " + (error.response?.data?.error || error.message));
            })
            .finally(() => {
                setIsLoading(false);
                resetCart()
            });
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-center">Checkout</h2>

            {cart.length === 0 ? (
                <p className="text-center">Il carrello è vuoto</p>
            ) : (
                <Row>
                    {/* Form on the Left */}
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={handleSubmit} className="mt-4">
                                    <h5>Dati Personali</h5>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName || ""}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.firstName}
                                                    disabled={isLoading}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.firstName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Cognome</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName || ""}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.lastName}
                                                    disabled={isLoading}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.lastName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email || ""}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                            disabled={isLoading}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Indirizzo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="address"
                                            value={formData.address || ""}
                                            onChange={handleChange}
                                            isInvalid={!!errors.address}
                                            disabled={isLoading}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Città</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="city"
                                                    value={formData.city || ""}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.city}
                                                    disabled={isLoading}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.city}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Telefono</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="telephone"
                                                    value={formData.telephone || ""}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.telephone}
                                                    disabled={isLoading}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.telephone}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Codice Promozionale (opzionale)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="promotionCode"
                                            value={formData.promotionCode || ""}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="success"
                                        type="submit"
                                        className="w-100 mt-3"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Elaborazione..." : "Completa Pagamento"}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Cart on the Right */}
                    <Col md={6}>
                        <ListGroup variant="flush">
                            {cart.map((item, index) => (
                                <ListGroup.Item key={index} className="mb-3">
                                    <Card>
                                        <Card.Body>
                                            <Row className="align-items-center">
                                                <Col xs={8}>
                                                    <Card.Title>{item.name}</Card.Title>
                                                    {item.discount_price && (
                                                        <Card.Text>
                                                            <small className="text-muted">
                                                                Prezzo originale: €{item.price}
                                                            </small>
                                                        </Card.Text>
                                                    )}
                                                </Col>
                                                <Col xs={4} className="text-end">
                                                    <h5 className="mb-0">
                                                        €{item.discount_price || item.price}
                                                    </h5>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Card className="mt-4">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h4>Totale</h4>
                                    </Col>
                                    <Col className="text-end">
                                        <h4>€{total}</h4>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}