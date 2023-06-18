const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAynsError = require("../middleware/catchAsyncErrors");
// const ApiFeatures = require("../utils/apiFeatures");
const ApiFeatures = require("../utils/apiFeatures");

// Create product only for Admin
exports.createProduct = catchAynsError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get product
exports.getAllProducts = catchAynsError(async (req, res) => {
  const resultperPage = 5;
  const apiFeatures = new ApiFeatures(Product.find(), req.query);
  const products = await apiFeatures.search().filter().pagination(resultperPage).query.exec();
  res.status(200).json({ success: true, products });
});

// get sinle product details
exports.getSingleProductDetails = catchAynsError(async (req, res, next) => {
  let products = await Product.findById(req.params.id);

  if (!products) {
    // res.status(404).json({ success: false, message: "Product Notfound" });
    // throw new ErrorHandler("No products found", 404)
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});
//Update Product -- admin
exports.updateProduct = catchAynsError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    // res.status(404).json({ success: false, message: "Product Notfound" });
    // throw new ErrorHandler("No products found", 404)
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
//   Delete product --Admin
exports.deleteProduct = catchAynsError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    // res.status(404).json({ success: false, message: "Product Notfound" });
    // throw new ErrorHandler("No products found", 404)
    return next(new ErrorHandler("Product not found", 404));
  }

  //   await product.remove();
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
