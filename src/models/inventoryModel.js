const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,        
        unique: true
    },
    price: {
        type: Number,
        required: true,
        get: getPrice, 
        set: setPrice
    },
    quantity: {
        type: Number        
    },
    category: {
        type: String,
    }
    ,
    warehouse: { 
        type: Schema.Types.ObjectId, 
        ref: "Warehouse"},
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model("Product", ProductSchema)