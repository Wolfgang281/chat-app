import { NODE_ENV } from "../config/index.util.js";

const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };

  // Default values
  error.message = err.message || "Internal Server Error";
  error.statusCode = err.statusCode || 500;

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);

    error.message = `${capitalizedField} already exists. Please use another ${field}.`;
    error.statusCode = 400;
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errLine: NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
