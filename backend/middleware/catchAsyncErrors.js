const productModel = require("../models/productModel")

// Yeh function async ko handle krny k lye ha catch sy pehly try ke condition and after catch
/* for expamle when we try to enter product without name(which is required) then it will loading infinite time */

module.exports = (theFunc) => (req , res, next) =>
{
    Promise.resolve(theFunc(req , res,next)).catch(next)
} 