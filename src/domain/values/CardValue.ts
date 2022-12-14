import * as crypto from 'crypto'
import { Card } from '../entities/Card'

/**
 * @description Clase para tokenización de tarjetas
 */
export class CardValue implements Card {
  public token: string // Token generado
  public card_number: string // Numero de tarjeta
  public cvv: string // Numero de seguridad
  public email: string // Correo electronico
  public expiration_year: string // Año de expiración
  public expiration_month: string // Mes de expiración
  public expiration_time: number // Tiempo de expiración de token

  constructor ({ card_number, cvv, email, expiration_year, expiration_month } : { // eslint-disable-line
    card_number: string
    cvv: string
    email: string
    expiration_year: string
    expiration_month: string
  }) {
    this.token = this.getTokenData() // Generate Token
    this.card_number = card_number
    this.cvv = cvv
    this.email = email
    this.expiration_year = expiration_year
    this.expiration_month = expiration_month
    this.expiration_time = this.getExpirationTime(15) // Calculate TTL
  }

  /**
   * @description Calcula el tiempo de expiración
   * @param TLL number Tiempo en minutos de expiración de token
   * @returns number Fecha de expiración en segundos
   */
  getExpirationTime (TTL: number): number {
    return Math.floor(Date.now() / 1000) + (TTL * 60)
  }

  /**
   * @description Genera Token con cryto
   * @returns string Token generado
   */
  getTokenData (): string {
    const buffer = crypto.randomBytes(8)
    return buffer.toString('hex')
  }
}
