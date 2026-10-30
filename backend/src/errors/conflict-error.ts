class ConflictError extends Error {
  public readonly statusCode = 409;

  constructor(message = 'Конфликт данных') {
    super(message);
    this.name = 'ConflictError';
  }
}

export default ConflictError;
