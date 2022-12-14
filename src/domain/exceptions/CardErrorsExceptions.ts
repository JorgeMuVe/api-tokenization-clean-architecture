/**
 * @description Clase para tokenización de tarjetas
 */
export class CardErrorsExceptions {
  public statusCode: number
  public message: string
  public data: any | null

  constructor (statusCode: number, message: string, data: any | null) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}
