class NotFoundError extends Error {
  public readonly statusCode = 404;

  constructor(message = 'Ресурс не найден') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
