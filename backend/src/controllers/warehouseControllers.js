const Warehouse = require('../models/warehouse');


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

//CREATE WAREHOUSE ENTRY
exports.createWarehouse = asyncHandler(async(req, res) => {
    const warehouse = await Warehouse.create(req.body);       
    return res.status(200).json({message: 'New warehouse created', warehouse});
});

//VIEW ALL WAREHOUSES
exports.viewWarehouse = asyncHandler(async(req, res) => {
    const warehouses = await Warehouse.find({}).populate("inventory");
    return res.status(200).json({warehouses});
});

//UPDATE WAREHOUSE BY ID
exports.updateWarehouse = asyncHandler(async(req, res) => {
    // let query = req.params._id;
    const warehouse = await Warehouse.findOne({ _id: req.params._id })

    // const updatedWarehouse = await Warehouse.findOneAndUpdate(query, req.body);   

    if (!warehouse) {
        return res.status(404).json({message: `Warehouse not found`});
    } else {
        const updatedWarehouse = await Warehouse.updateOne(req.body);
        return res.status(200).json({message: `Warehouse is updated.`});
    }
}
);

// //DELETE INVENTORY ITEM
exports.deleteWarehouse = asyncHandler(async(req, res) => {
    let query = req.params._id;

    const deletedWarehouse = await Warehouse.findByIdAndDelete(query);

    if (deletedWarehouse) {
        return res.status(200).json({message: `Warehouse deleted.`})
    } else {
        return res.status(404).json({message: `Warehouse not found`});
    }
    
});