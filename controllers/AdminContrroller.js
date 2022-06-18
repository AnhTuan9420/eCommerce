const Account = require("../models/AccountModel");
const Product = require("../models/ProductModel");

// Add Product
const addProduct = async (error, req, res, next) => {
    const { name, desc, price, timeCreated } = req.body;
    // const User = await UserModel.findOne({ account_id: req.session.userId });\
    console.log(req);
    console.log(req.files);

    var video, image;
    try {
        if (req.file.filename.endsWith(".mp4")) {
            video = req.file.filename
        } else {
            image = req.file.filename
        }
        const newProduct = new Product({
            name: name,
            productImage: "",
            productVideo: "",
            desc: desc,
            price: price,
            timeCreated: timeCreated,
        });
        console.log("=---------------------------------dsas");
        const result = await newProduct.save();
        // await User.posts.push(result);
        // await User.save();
        console.log(result);
        // const msg = "Add New Post Sucsessfully!";
        return res.status(400).send({ error: error.message })
        // return res.redirect(`/user/HomePage?msg=${msg}`);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { addProduct }
