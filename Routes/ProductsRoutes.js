const express = require('express');
const router = express.Router();

// Import the product controller
const productController = require('../Controllers/ProductController');



//define routes for products
router.post('/createproduct', productController.createProducts);
router.put('/updateproduct/:id', productController.updateProducts);
router.get('/getproduct/:id', productController.getProductById);
router.get('/getallproducts', productController.getAllProducts);
router.delete('/deleteproduct/:id', productController.deleteProduct);


//export the router to be used in the other files
module.exports = router;
