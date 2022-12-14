// import { CardEntity } from './card.entity'
// import { CardValue } from './card.value'
import { Card } from '../entities/Card'

/**
 * @description Hace referencia a los metodos implementar en capa de datos
 */
export interface CardRepository {
  findAll: () => Promise<Card[] | null>
  findCardByNumber: (number: string) => Promise<Card | null>
  findCardByToken: (token: string) => Promise<Card | null>
  saveCardData: (cardData: Card) => Promise<Card | null>
}
