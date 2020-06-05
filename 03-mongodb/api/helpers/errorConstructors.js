class BaseError extends Error {
  constructor(name, status, message) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class NotFound extends BaseError {
  constructor(message) {
    super("NotFound", 404, message);
  }
}