export interface Response {
  error?: ResponseError
}

export interface ResponseError {
  id: string
  message: string
}
