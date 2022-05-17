const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,        
        unique: true
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,       
    },
    quantity: {
        type: Number        
    },
    category: {
        type: String,
        enum: ["grocery", "health", "personal care", "beauty", "office", "sports", "pets", "household", "electronics", "baby", "toys", "patio & garden", "home improvement", "auto", "crafts", "entertainment", "apparel", "furniture"]
    }
    ,
    warehouse: { 
        type: Schema.Types.ObjectId, 
        ref: "Warehouse"},
});



module.exports = mongoose.model("Product", ProductSchema)