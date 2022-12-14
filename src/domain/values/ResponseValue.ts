/**
 * @description Clase para tokenización de tarjetas
 */
export class ResponseValue {
  public statusCode: number
  public message: string
  public body: any | null

  constructor (statusCode: number, message: string, body: any | null) {
    this.statusCode = statusCode
    this.message = message
    this.body = body
  }
}
