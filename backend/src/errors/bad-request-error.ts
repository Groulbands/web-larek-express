class BadRequestError extends Error {
  public readonly statusCode = 400;

  constructor(message = 'Некорректные данные') {
    super(message);
    this.name = 'BadRequestError';
  }
}

export default BadRequestError;
