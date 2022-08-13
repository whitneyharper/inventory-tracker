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
    const userId = req.user._id;
    const warehouse = await Warehouse.create({ 
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        user_id: userId 
        });       
    return res.status(200).json({message: 'New warehouse created', warehouse});
});

//VIEW ALL WAREHOUSES
exports.viewWarehouse = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const warehouses = await Warehouse.find({ user_id: userId }).populate("inventory");
    return res.status(200).json({warehouses});
});

//UPDATE WAREHOUSE BY ID
exports.updateWarehouse = asyncHandler(async(req, res) => {
    let query = req.params._id;
   
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(query, req.body);   

    if (!updatedWarehouse) {
        return res.status(404).json({message: `Warehouse not found`});
    } else {
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