const mongoose = require("mongoose");
const { Schema } = mongoose;
const WarehouseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    city: {
        type: String, 
        required: true
    },
    state: {
        type: String, 
        required: true,
        match: [/(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/, "Must use State Abbreviations"],
    },   
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    inventory: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Product"}],
});

module.exports = mongoose.model("Warehouse", WarehouseSchema)