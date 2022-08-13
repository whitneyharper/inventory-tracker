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
        type: Number,
        required: true        
    },
    category: {
        type: String,
        required: true,
        enum: ["grocery", "health", "personal care", "beauty", "office", "sports", "pets", "household", "electronics", "baby", "toys", "patio & garden", "home improvement", "auto", "crafts", "entertainment", "apparel", "furniture"]
    }
    ,
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    warehouse: { 
        type: Schema.Types.ObjectId, 
        ref: "Warehouse"},
});



module.exports = mongoose.model("Product", ProductSchema)