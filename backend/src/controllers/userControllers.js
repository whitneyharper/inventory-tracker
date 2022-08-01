const User = require('../models/user');


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
    
});