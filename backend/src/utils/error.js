export class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.status = 404;
  }
}

export class ValidationError extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.status = 400;
  }
}

export class InternalServerError extends Error {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.status = 500;
  }
}
