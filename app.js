const express = require('express');
const app = express();

const env = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const productRoutes = require('./Routes/ProductsRoutes');

env.config(); // Load environment variables from .env file

connectDB(); // Connect to MongoDB

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/products', productRoutes); // Use the product routes for all requests starting with /products

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

