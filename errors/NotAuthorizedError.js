class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = NotAuthorizedError;
