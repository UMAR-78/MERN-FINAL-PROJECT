const mongoose = require("mongoose");

const productScheme = mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  images: 
  [  //ye array is lye ku k ek product ke ek sy zayada pics ho skti hyn
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  category:
{
  type: String,
  required: [true, "Please enter product category"], 
} , 
stock:
{
  type:Number,
  required: [true, "Please enter product stock"],
  maxLength:[4 , "Stock cannot exceed 4 characters"],
  default:1 
} ,
numberOfReviews:
{
  type:Number, 
  default:0
},
reviews:
[
      {
          name:           /* user ka name */ 
          {
              type:String, 
              required:true,
          },
          rating:
          {  type:String, 
              required:true,
          },
          comment:
          {
              type:String, 
              required:true,
          },
          

          
      }
] , 
createdAt:
{
  type:Date , 
  default: Date.now
} 

});



module.exports = mongoose.model("Products" , productScheme)









 
 
 

