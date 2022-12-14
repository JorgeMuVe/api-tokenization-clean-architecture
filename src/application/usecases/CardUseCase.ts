import { Card } from '../../domain/entities/Card'
import { CardRepository } from '../../domain/repositories/CardRepository'
import { ExistsCard } from '../../domain/services/ExistsCard'
import { ValidateCard } from '../../domain/services/ValidateCard'
// import { CardAlreadyExistsException } from '../../domain/exceptions/CardAlreadyExistsException'
import { CardValue } from '../../domain/values/CardValue'
import { ResponseValue } from '../../domain/values/ResponseValue'
// import { CardErrorsExceptions } from '../../domain/exceptions/CardErrorsExceptions'

export class CardUseCase {
  private readonly _cardRepository: CardRepository
  private readonly _existsCard: ExistsCard
  private readonly _validateCard: ValidateCard

  constructor (cardRespository: CardRepository) {
    this._cardRepository = cardRespository
    this._existsCard = new ExistsCard(cardRespository)
    this._validateCard = new ValidateCard()
  }

  async findAll (): Promise<ResponseValue> {
    let response: ResponseValue = new ResponseValue(400, 'Vuelva a intentarlo', null)
    try {
      const allCards = await this._cardRepository.findAll()
      if (allCards === null) return response
      response = { statusCode: 200, message: 'Success', body: allCards }
    } catch (error) { console.log(error) }
    return response
  }

  async findCardByNumber (cardNumber: string): Promise<ResponseValue> {
    let response: ResponseValue = new ResponseValue(400, 'Vuelva a intentarlo', null)
    try {
      if (!this._validateCard.validateCreditCardNumber(cardNumber)) return { statusCode: 400, message: 'Error', body: ['El número de tarjeta ingresado es incorrecto'] }
      const cardFound = await this._cardRepository.findCardByNumber(cardNumber)
      if (cardFound === null) return response
      response = { statusCode: 200, message: 'Success', body: cardFound }
    } catch (error) { console.log(error) }
    return response
  }

  async findCardByToken (token: string): Promise<ResponseValue> {
    const response: ResponseValue = new ResponseValue(400, 'Vuelva a intentarlo', null)
    try {
      if (!this._validateCard.validateFormatToken(token)) return { statusCode: 400, message: 'Error', body: ['El token de tarjeta ingresado es incorrecto'] } // 'Error: Invalid token'
      const cardFound = await this._cardRepository.findCardByToken(token)
      if (cardFound === null) return { statusCode: 400, message: 'Error', body: ['La tarjeta ha expirado o no existe'] } // 'Error: Not found token'
      return { statusCode: 200, message: 'Success', body: { ...cardFound, cvv: null } }
    } catch (error) { console.log(error) }
    return response
  }

  async saveCardData (cardData: Card): Promise<ResponseValue> {
    const response: ResponseValue = new ResponseValue(400, 'Vuelva a intentarlo', null)
    try {
      const errors: string[] = await this._validateCard.validateDataCard(cardData)
      if (errors.length > 0) return { statusCode: 400, message: 'Error', body: errors }
      const existsCard: boolean = await this._existsCard.byNumber(cardData.card_number)
      if (existsCard) return { statusCode: 400, message: 'Error', body: [`Tarjeta registrada ${cardData.card_number}`, ...errors] } // eslint-disable-line
      const card: CardValue = new CardValue(cardData)
      const cardSafe: Card | null = await this._cardRepository.saveCardData(card)
      if (cardSafe === null) return { statusCode: 400, message: 'Error', body: ['Vuelva a intentarlo', ...errors] }
      return { statusCode: 200, message: 'Success', body: { token: cardSafe.token } }
    } catch (error) { console.log(error) }
    return response
  }
}
