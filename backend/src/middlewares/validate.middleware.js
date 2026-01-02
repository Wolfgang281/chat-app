import ErrorResponse from "../utils/ErrorResponse.util.js";

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      const errorDetails = error.details.map((detail) => detail.message);
      return next(new ErrorResponse(errorDetails.join(" "), 400));
    }
    req.body = value;
    next();
  };
};

export default validateBody;
