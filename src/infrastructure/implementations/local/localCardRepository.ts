import { Card } from '../../../domain/entities/Card'
import { CardRepository } from '../../../domain/repositories/CardRepository'
// import cardJSON from './cards/card.json'

export class LocalCardRepository implements CardRepository {
  private readonly cardData: Card[] = []

  async findAll (): Promise<Card[] | []> {
    return this.cardData
  }

  async findCardByNumber (number: string): Promise<Card | null> {
    const cardFound = this.cardData.find(x => x.card_number === number)
    if (cardFound === undefined) return null
    return cardFound
  }

  async findCardByToken (token: string): Promise<Card | null> {
    const cardFound = this.cardData.find(x => x.cvv === token)
    if (cardFound === undefined) return null
    return cardFound
  }

  async saveCardData (cardData: Card): Promise<Card | null> {
    this.cardData.push(cardData)
    return cardData
  }
}
