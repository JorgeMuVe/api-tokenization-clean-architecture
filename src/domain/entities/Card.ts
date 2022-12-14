
/**
 * @description Interface para datos de tarjeta
 */
export interface Card {
  token?: string
  card_number: string
  cvv: string
  email: string
  expiration_year: string
  expiration_month: string
  expiration_time?: number
}
