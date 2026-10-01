const Product = require(`../Models/Products`);

//create a new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
       res.status(400).json({message: error.message});
    }
};

module.exports = ( createProduct );

//get all products

const getAllProducts = async 
