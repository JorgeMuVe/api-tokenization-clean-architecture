import { CardRepository } from '../repositories/CardRepository'

export class ExistsCard {
  private readonly _cardRepository: CardRepository
  constructor (cardRepository: CardRepository) {
    this._cardRepository = cardRepository
  }

  async byNumber (number: string): Promise<boolean> {
    const card = await this._cardRepository.findCardByNumber(number)
    // const cardList = await this._cardRepository.findAll()
    // console.log('LISTA DE TARJETAS: ', cardList)
    if (card !== null) { return true }
    return false
  }

  async byToken (token: string): Promise<boolean> {
    const card = await this._cardRepository.findCardByToken(token)
    if (card !== null) { return true }
    return false
  }
}
