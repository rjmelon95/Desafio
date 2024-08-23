const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password', // substitua pelo seu password
    database: 'nunes_sport'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Rotas CRUD

// Create (POST)
app.post('/api/products', (req, res) => {
    const { product_code, name, description, price } = req.body;
    const sql = 'INSERT INTO products (product_code, name, description, price) VALUES (?, ?, ?, ?)';
    db.query(sql, [product_code, name, description, price], (err, result) => {
        if (err) throw err;
        res.send('Produto criado com sucesso');
    });
});

// Read (GET)
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Update (PUT)
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { product_code, name, description, price } = req.body;
    const sql = 'UPDATE products SET product_code = ?, name = ?, description = ?, price = ? WHERE id = ?';
    db.query(sql, [product_code, name, description, price, id], (err, result) => {
        if (err) throw err;
        res.send('Produto atualizado com sucesso');
    });
});

// Delete (DELETE)
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Produto deletado com sucesso');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
