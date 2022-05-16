const mongoose = require("mongoose");
const { Schema } = mongoose;
const WarehouseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        city: {type: String, required: true},
        state: {type: String, required: true},        
    },
    inventory: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Product"}],
});

module.exports = mongoose.model("Warehouse", WarehouseSchema)