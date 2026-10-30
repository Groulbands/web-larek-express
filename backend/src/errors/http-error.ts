export class HttpError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) { super(400, message); }
}

export class NotFoundError extends HttpError {
  constructor(message: string) { super(404, message); }
}

export class ConflictError extends HttpError {
  constructor(message: string) { super(409, message); }
}
