class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // super(message);
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
