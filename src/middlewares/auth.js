const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        //first get the token
        const { token } = req.cookies;
        if(!token) {
            throw new Error("Token is not valid");
            
        }
        // verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
        //get the user id
        const { _id } = decoded;

        //now find that user by using that id
        const user = await User.findById(_id);

        if(!user){
            throw new Error("User not found");
            
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
}

module.exports = {userAuth};