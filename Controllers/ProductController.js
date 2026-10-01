const Product = require(`../Models/Products`);

//create a product
exports.createProducts = async (req, res) => {
    try {
        const { name, size, description, price, quantity, color } = req.body;

        //check if all required fields are provided
        if (!name || !size || !description || !price || !quantity || !color) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const product = new Product({ name, size, description, price, quantity, color });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

//update a product
exports.updateProducts = async (req, res) => {
    try {
        const { id } = req.params; //where id is the product to be updated
        const { name, size, description, price, quantity, color } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity, color }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }   
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

//get by id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product found', product });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products fetched successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

//delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};


