const Product = require(`../Models/Products`);

//create a product
exports.createProducts = async (req, res) => {
    try {
        const { name, size, description, price, quantity } = req.body;

        const product = new Product({ name, size, description, price, quantity });
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
        const { name, size, description, price, quantity } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }   
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};
