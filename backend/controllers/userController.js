const ErrorHandler = require("../utils/errorHandler");
const catchAynsError = require("../middleware/catchAsyncErrors");
const User = require('../models/userModel')
const bcrypt = require('bcrypt')


// Register User

const RegisterUser = catchAynsError(async(req, res, next)=>
{
    const {name , email , password} = req.body
    const user = await User.create(
        {
            name , email , password,
            avatar:
            {
                public_id:'sample id',
                url:"sample url",

            }
        }
    )
    const token = user.getJWTToken();
    res.status(201).json(
        {
            success:true , 
            token,
        }
    )
    
})




module.exports = 
{
    RegisterUser,
}