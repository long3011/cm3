const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

if (!authorization){
    return res.status(401).json({error: "Authorization token required"})
}

const token = authorization.split(" ")[1]; // [0]=Bearer [1]= x5d9sfu99f29hhf09hjf09qjojpfomanmvoie

try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({_id}).select("_id")
    next()
} catch(error) {
    console.log(error);
    res.status(500).json({error: error.message})
}
}
module.exports = requireAuth;