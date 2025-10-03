const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const generateToken = (_id) => {

return jwt.sign({_id}, process.env.SECRET,{
    expiresIn:"3d",
});
};

const signup = async ( req, res ) => {

    const {
        name,
        username,
        password,
        phone_number,
        gender,
        date_of_birth,
        membership_status,
        bio,
        address,
        profile_picture,
        } = req.body

    try{
        if(
            !name ||
            !username ||
            !password ||
            !phone_number ||
            !gender ||
            !date_of_birth ||
            !membership_status ||
            !address)
        { res.status(400).json({message: "Missing required fields"})}
        const userExists = await User.findOne({username});

        if(userExists) {
            res.status(400).json({message: "User alredy exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)       
    
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
            phone_number,
            gender,
            date_of_birth,
            membership_status,
            bio,
            address,
            profile_picture,
        });
        if (user){
            const token = generateToken(user._id);
            res.status(200).json({ username, token })
        } else{
            res.status(400).json({message: "Invalid user data"}) 
        } 
    } catch (error){
        res.status(400).json({ error: error.message });
    }
}

const login = async ( req, res ) => {
    const {username,password} = req.body;
    try{
        const user = await User.findOne({username});
        if (user && (await bcrypt.compare(password, user.password))){
            const token = generateToken(user._id);
            res.status(200).json({username,token})
        } else{
            res.status(400).json({message:"Invalid credentials"})
        }
    } catch (error){
    res.status(400).json({error: error.message})
    }
}


module.exports = { signup, login }