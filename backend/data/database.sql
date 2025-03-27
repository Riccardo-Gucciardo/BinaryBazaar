-- Tabella Guest (per tracciare i guest user)
CREATE TABLE guests (
    guest_id INT PRIMARY KEY AUTO_INCREMENT,
    session_token VARCHAR(100) NOT NULL UNIQUE, -- Identificativo univoco per il guest
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP, -- Per gestire la scadenza della sessione
    INDEX idx_session_token (session_token) -- Indice per velocizzare le query
);

-- Tabella Promozioni (per codici sconto)
CREATE TABLE promotions (
    promotion_id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount DECIMAL(5,2) NOT NULL, -- Es. 10.00 per 10% di sconto
    valid_from DATE,
    valid_to DATE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Tabella Brand
CREATE TABLE brands (
    brand_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- Tabella Prodotti (unificata per laptop e accessori)
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) NOT NULL UNIQUE, -- Per URL (es. "macbook-air-m2")
    brand_id INT,
    category ENUM('laptop', 'accessory') NOT NULL,
    model VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2), -- Prezzo originale per promozioni
    is_promotion BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Per "ultimi arrivi"
    stock INT NOT NULL,
    description TEXT,
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id)
);

-- Tabella Dettagli Laptop (specifiche tecniche per i laptop)
CREATE TABLE laptop_details (
    laptop_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    processor VARCHAR(50),
    ram TINYINT,
    memory SMALLINT,
    video_card VARCHAR(50),
    os VARCHAR(50),
    year YEAR,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Tabella Dettagli Accessori (specifiche tecniche per gli accessori)
CREATE TABLE accessory_details (
    accessory_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    type VARCHAR(50),
    compatibility VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Tabella Ordini (collegata ai guest)
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    guest_id INT,
    email VARCHAR(100) NOT NULL, -- Raccolto al checkout
    address VARCHAR(255) NOT NULL, -- Raccolto al checkout
    telephone VARCHAR(20), -- Raccolto al checkout
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    promotion_id INT, -- Per applicare uno sconto
    state ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (guest_id) REFERENCES guests(guest_id),
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id)
);

-- Tabella Prodotti Ordinati
CREATE TABLE product_order (
    product_order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    amount INT NOT NULL,
    price DECIMAL(10,2) NOT NULL, -- Prezzo al momento dell'ordine
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


INSERT INTO brands (name) VALUES
('Apple'), ('Dell'), ('HP'), ('Asus'), ('MSI'),
('Lenovo'), ('Acer'), ('Samsung'), ('Sony'), ('Logitech');

-- Inserimento Promozioni
INSERT INTO promotions (code, discount, valid_from, valid_to, is_active) VALUES
('SUMMER25', 25.00, '2025-06-01', '2025-08-31', TRUE),
('WELCOME10', 10.00, '2025-01-01', '2025-12-31', TRUE);

-- Inserimento Guest (esempio)
INSERT INTO guests (session_token, created_at, expires_at) VALUES
('guest_12345', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY));

-- Inserimento Prodotti (Laptop)
INSERT INTO products (slug, brand_id, category, model, price, original_price, is_promotion, image_url, stock, description) VALUES
('macbook-air-m2', 1, 'laptop', 'MacBook Air M2', 1299.99, 1499.99, TRUE, NULL, 20, 'Laptop leggero con chip M2'),
('dell-xps-15', 2, 'laptop', 'Dell XPS 15', 1799.99, NULL, FALSE, NULL, 15, 'Laptop con display 4K'),
('hp-spectre-x360', 3, 'laptop', 'HP Spectre x360', 1599.99, NULL, FALSE, NULL, 18, 'Laptop convertibile premium'),
('asus-rog-zephyrus', 4, 'laptop', 'Asus ROG Zephyrus', 1999.99, 2199.99, TRUE, NULL, 12, 'Laptop gaming sottile'),
('msi-stealth-15m', 5, 'laptop', 'MSI Stealth 15M', 1699.99, NULL, FALSE, NULL, 10, 'Laptop gaming portatile'),
('lenovo-thinkpad-x1', 6, 'laptop', 'Lenovo ThinkPad X1 Carbon', 1899.99, NULL, FALSE, NULL, 14, 'Laptop business ultraleggero'),
('acer-swift-5', 7, 'laptop', 'Acer Swift 5', 1199.99, NULL, FALSE, NULL, 25, 'Laptop con design elegante'),
('samsung-galaxy-book', 8, 'laptop', 'Samsung Galaxy Book Pro', 1399.99, NULL, FALSE, NULL, 20, 'Laptop con AMOLED'),
('sony-vaio-sx14', 9, 'laptop', 'Sony VAIO SX14', 2099.99, NULL, FALSE, NULL, 8, 'Laptop premium compatto'),
('logitech-creator-laptop', 10, 'laptop', 'Logitech Creator Laptop', 1499.99, NULL, FALSE, NULL, 15, 'Laptop per creativi');

-- Inserimento Dettagli Laptop
INSERT INTO laptop_details (product_id, processor, ram, memory, video_card, os, year) VALUES
(1, 'Apple M2', 8, 256, 'Integrated', 'macOS', 2023),
(2, 'Intel i7', 16, 512, 'NVIDIA RTX 3050', 'Windows 11', 2023);

-- Inserimento Prodotti (Accessori)
INSERT INTO products (slug, brand_id, category, model, price, original_price, is_promotion, image_url, stock, description) VALUES
('apple-magic-mouse', 1, 'accessory', 'Apple Magic Mouse', 99.99, NULL, FALSE, NULL, 50, 'Mouse multi-touch'),
('dell-wireless-keyboard', 2, 'accessory', 'Dell Wireless Keyboard', 59.99, NULL, FALSE, NULL, 40, 'Tastiera wireless silenziosa'),
('hp-usb-c-hub', 3, 'accessory', 'HP USB-C Hub', 79.99, NULL, FALSE, NULL, 35, 'Hub multiporta USB-C'),
('asus-rog-mouse-pad', 4, 'accessory', 'Asus ROG Mouse Pad', 29.99, NULL, FALSE, NULL, 60, 'Tappetino gaming XL'),
('msi-gaming-headset', 5, 'accessory', 'MSI Gaming Headset', 89.99, NULL, FALSE, NULL, 30, 'Cuffie con microfono'),
('lenovo-docking-station', 6, 'accessory', 'Lenovo Docking Station', 129.99, NULL, FALSE, NULL, 25, 'Dock per laptop ThinkPad'),
('acer-laptop-sleeve', 7, 'accessory', 'Acer Laptop Sleeve', 39.99, NULL, FALSE, NULL, 45, 'Custodia protettiva 15"'),
('samsung-ssd-external', 8, 'accessory', 'Samsung SSD External', 149.99, NULL, FALSE, NULL, 20, 'SSD portatile 1TB'),
('sony-wh-1000xm5', 9, 'accessory', 'Sony WH-1000XM5', 349.99, 399.99, TRUE, NULL, 15, 'Cuffie noise-cancelling'),
('logitech-mx-master-3', 10, 'accessory', 'Logitech MX Master 3', 109.99, NULL, FALSE, NULL, 30, 'Mouse ergonomico avanzato');

-- Inserimento Dettagli Accessori
INSERT INTO accessory_details (product_id, type, compatibility) VALUES
(11, 'Mouse', 'macOS, Windows'),
(12, 'Keyboard', 'Windows');





