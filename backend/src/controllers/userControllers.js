const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: '3d'})
}

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
    const user = await User.findOne({ email: req.body.email })
    if (!user){
        return res.status(401).json({message: "Incorrect email or email doesn't exist."})
    }

    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match){
        return res.status(401).json({ message: "Incorrect password."})
    }

    //CREATE A TOKEN
    const token = createToken(user._id);

    return res.status(200).json({user, token})
});

//SIGNUP USER
exports.signupUser = asyncHandler(async(req, res) => {
    const exist = await User.findOne({ email: req.body.email });
    if(exist){
        return res.status(409).json({message: "Email already in use"})
    } 

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({email: req.body.email, password: hash});

    //CREATE A TOKEN
    const token = createToken(user._id);

    const email = user.email;

    return res.status(200).json({email , token});
});