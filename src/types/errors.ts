export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class NetworkError extends Error {
  constructor(endpoint: string) {
    super(`Network request failed for ${endpoint}`)
    this.name = 'NetworkError'
  }
}
