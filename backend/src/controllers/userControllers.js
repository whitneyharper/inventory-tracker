const User = require('../models/user');
const bcrypt = require('bcrypt');


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

//LOGIN USER
exports.loginUser = asyncHandler(async(req, res) => {
    
});

//SIGNUP USER
exports.signupUser = asyncHandler(async(req, res) => {
    const exists = await User.findOne({ email: req.body.email });

    if(exists){
        res.status(409).json({message: "Email already in use"})
    } 

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({email: req.body.email, password: hash});
    return res.status(200).json({message: 'New user created', user});
});