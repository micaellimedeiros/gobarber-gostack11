class AppError {
  public readonly message: string;

  public readonly statusCode: number; // 400, 401 ,404

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
