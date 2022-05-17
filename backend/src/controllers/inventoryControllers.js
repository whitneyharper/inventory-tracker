const Product = require('../models/inventory');

const asyncHandler = (cb) => {
    return async(req, res, next) => {
        try{
            await cb(req, res, next)
        } catch(error) {
            res.status(500).send(error);
            console.log(error)
        }
    }
}


//CREATE INVENTORY ITEM
exports.createProduct = asyncHandler(async(req, res) => {
    const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
});

return res.status(200).json({message: 'New product added to inventory', product});
});

//VIEW ALL INVENTORY ITEMS
exports.viewInventory = asyncHandler(async(req, res) => {
    const products = await Product.find({});
    return res.status(200).json({products});
});

//EDIT INVENTORY ITEM
exports.updateProduct = asyncHandler(async(req, res) => {
    let query = req.params._id;

    const updatedProduct = await Product.findOneAndUpdate(query, req.body);   

    if (!updatedProduct) {
        return res.status(404).json({message: `Product not found`});
    } else {
        return res.status(200).json({message: `Product is updated.`});
    }
}

);

// //DELETE INVENTORY ITEM
exports.deleteProduct = asyncHandler(async(req, res) => {
    let query = req.params._id;

    const deletedProduct = await Product.findOneAndDelete(query);

    if (deletedProduct) {
        return res.status(200).json({message: `Product deleted.`})
    } else {
        return res.status(404).json({message: `Product not found`});
    }
    
});