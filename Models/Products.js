const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
    },
    color: {
    type: String,
    
  },
},
{timestamps: true}, //Date created and updated at
);

//create model from schema
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
