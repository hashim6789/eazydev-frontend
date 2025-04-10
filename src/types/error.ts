export interface ErrorData {
  error: string;
}

export interface ErrorResponse {
  data: ErrorData;
}

export interface ErrorType {
  response: ErrorResponse;
}
