// errors/CustomError.js
class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Data not found") {
    super(404, message);
  }
}

class BadRequestError extends CustomError {
  constructor(message = "Bad request") {
    super(400, message);
  }
}

class AunothorizedError extends CustomError {
  constructor(message = "Unauthorized access") {
    super(400, message);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = "Forbidden access") {
    super(400, message);
  }
}

module.exports = { NotFoundError, BadRequestError };
