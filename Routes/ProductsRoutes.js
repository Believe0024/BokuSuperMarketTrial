const express = require('express');
const router = express.Router();

// Import the product controller
const productController = require('../Controllers/ProductController');



//define routes for products
router.post('/createproduct', productController.createProducts);
router.put('/updateproduct/:id', productController.updateProducts);

//export the router to be used in the other files
module.exports = router;
