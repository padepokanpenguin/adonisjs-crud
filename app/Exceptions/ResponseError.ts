export class ResponseError extends Error {
  constructor() {
    super();
  }

  public static handler(error, response, description) {
    response.send({
      message: description + error.message || error,
      error,
    });
  }
}
