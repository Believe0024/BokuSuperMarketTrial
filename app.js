const express = require('express');
const app = express();
const productRoutes = require('./Routes/ProductsRoutes');

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/products', productRoutes); // Use the product routes

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

