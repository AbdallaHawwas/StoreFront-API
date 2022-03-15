
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    user_id INTEGER,
    quantity INTEGER DEFAULT 1,
    status INTEGER DEFAULT 1
);