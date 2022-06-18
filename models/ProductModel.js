var mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    productImage: [
        {
            type: String,
        }
    ],
    productVideo: {
        type: String,
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },

});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;