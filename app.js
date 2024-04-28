const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;  // Export for testing or modularization

app.post('/submit-product', async (req, res) => {
    const { productID, productName, productionDate } = req.body;
    const result = await submitTransaction('createProduct', productID, productName, productionDate);
    res.status(200).json({ result: result.toString() });
});


app.get('/product-movement', (req, res) => {
    // Dummy data for demonstration
    res.json({
        products: [
            { productID: '1', productName: 'Product 1', status: 'Shipped' },
            { productID: '2', productName: 'Product 2', status: 'In Transit' }
        ]
    });
});

