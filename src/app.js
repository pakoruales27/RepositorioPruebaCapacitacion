alert("Inicio");

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'E-commerce API' });
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
        console.log(`Server running on port ${PORT}`);
});

module.exports = app;
alert("Inicio");

//TODO:AC Add routes for products, users, and orders
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
const orderRoutes = require('./routes/orders');
app.use('/orders', orderRoutes);


