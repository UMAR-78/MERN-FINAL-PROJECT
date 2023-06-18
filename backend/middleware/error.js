// const ErrorHandler = require("../utils/errorHandler");

const ErrorHandler = require("../utils/errorHandler");

const errorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Invalid id error (cast erros)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.stack,
  });
};

module.exports = errorHandlerMiddleware;
