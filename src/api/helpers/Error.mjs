export class HttpError extends Error {
  status;
  message;
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export class NotFoundError extends HttpError {
  constructor(msg) {
    super(msg, 404);
  }
}
