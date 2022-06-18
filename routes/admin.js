var express = require("express");
var router = express.Router();

var { addProduct } = require("../controllers/AdminContrroller");
var { imageUpload, videoUpload } = require("../middleware/upload");

// For Single image upload
router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

// For Multiple image uplaod
router.post('/uploadBulkImage', imageUpload.array('images', 4), (req, res) => {
    res.send(req.files)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});


router.post('/uploadVideo', videoUpload.single('video'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

router.post('/addProduct', imageUpload.array('files'), addProduct);

module.exports = router;