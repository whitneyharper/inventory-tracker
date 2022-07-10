const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true 
    }
    
});

module.exports = mongoose.model("User", UserSchema)