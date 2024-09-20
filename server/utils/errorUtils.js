class AppError extends Error {
  constructor(message, statusCode = 500) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const globalErrorHandler = (err, req, res, next) => {
  res
    .status(err.statusCode)
    .json({ success: false, errorMessage: err.message });
};

module.exports = { AppError, globalErrorHandler };
