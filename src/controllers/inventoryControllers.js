const db = require('../databases/database');
const { Product } = db.models;

const asyncHandler = (cb) => {
    return async(req, res, next) => {
        try{
            await cb(req, res, next)
        } catch(error) {
            res.status(500).send(error);
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
    const products = await Product.findAll();
    return res.status(200).send(products);
});

//EDIT INVENTORY ITEM
exports.updateProduct = asyncHandler(async(req, res) => {
    await Product.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const updatedProduct = await Product.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!updatedProduct) {
        return res.status(404).json({message: `Product not found`});
    } else {
        return res.status(200).json({message: `Product is updated.`, updatedProduct});
    }
}

);

//DELETE INVENTORY ITEM
exports.deleteProduct = asyncHandler(async(req, res) => {
    const deletedProduct = await Product.destroy({
        where: {
            id: req.params.id
        }
    })
    if (deletedProduct) {
        return res.status(200).json({message: `Product deleted.`})
    } else {
        return res.status(404).json({message: `Product not found`});
    }
    
});