const mongoose = require("mongoose");
const validtor = require("validator");
const  JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validtor.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be 8 characters long"],
    select: false /*  iska mtlb password ko nikal k baqi sari information dy dyn */,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role:{
    type:String,
    default:"user"
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,

});


// jb be user schema save ho us say pehly yeh kam krna ha ye khudi hojay ga 
userSchema.pre('save' ,async function(next)
{ 
      // update krny k lye bs name or email krna ha update
      // for example agar user ny kuch update kia or wo b save he hoga tou pehly sy hash passsword ko dobara hash krydga is lye ye if
      if(!this.isModified('password'))
      {
          next();
      }

    this.password = await bcrypt.hash(this.password , 10)    /* 10 is power of haseh password mtlb k kitna strong password hoga */
})

// JWT TOKEN
userSchema.methods.getJWTToken = function()
{
  //this._id YE wo wali id ha jo k jb user register kry ga tou ek id bnti ha to id ko wo wali id dy rhy hyn

  return JWT.sign({id:this._id}  , process.env.JWT_SECRET , {
    expiresIn: process.env.JWt_EXPIRE,
  })
}


module.exports = mongoose.model("User" , userSchema)  