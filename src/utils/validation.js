const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is required!");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email Id is not valid!");
        
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!");
        
    }
}

module.exports = {
    validateSignupData,
}