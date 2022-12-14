// import { DynamoDB } from 'aws-sdk'
// import { DynamoDB } from 'aws-sdk'
import { DynamoDB } from '../../../driven-adapters/aws/dynamodb'
import { Card } from '../../../../domain/entities/Card'
import { CardRepository } from '../../../../domain/repositories/CardRepository'

export class DynamoDBCardRepository implements CardRepository {
  private readonly _db = DynamoDB.getInstace()

  async findAll (): Promise<Card[] | []> {
    const result = await this._db.scan({ TableName: 'CardTable' }).promise() // Get all data from CardTable
    const lista = result.Items ?? []
    const response = lista.map(e => {
      const card: Card = {
        token: e.token,
        card_number: e.card_number,
        cvv: e.cvv,
        email: e.email,
        expiration_month: e.expiration_month,
        expiration_year: e.expiration_year,
        expiration_time: e.expiration_time
      }
      return card
    })
    return response
  }

  async findCardByNumber (cardNumber: string): Promise<Card | null> {
    const result = await this._db.scan({ TableName: 'CardTable', FilterExpression: 'card_number = :cardNumber', ExpressionAttributeValues: { ':cardNumber': cardNumber } }).promise() // Find card by number
    if (result?.Count !== undefined && result?.Items !== undefined) {
      const card: Card | null = result.Count > 0 ? { token: result.Items[0].token, card_number: result.Items[0].card_number, cvv: result.Items[0].cvv, email: result.Items[0].email, expiration_month: result.Items[0].expiration_month, expiration_year: result.Items[0].expiration_year, expiration_time: result.Items[0].expiration_time } : null
      return card
    } else { return null }
  }

  async findCardByToken (token: string): Promise<Card | null> {
    // const eliminado = await this._db.delete({ TableName: 'CardTable', Key: { token } }).promise() // Elimina empleado
    // console.log('ELIMINADO', eliminado) // AQUI CAMBIARRR >>>>>>>>>>>>>>>>>>> ??
    const result = await this._db.get({ TableName: 'CardTable', Key: { token } }).promise() // Find card by token
    const card: Card | null = (result.Item === null || result.Item === undefined || JSON.stringify(result.Item) === '{}') ? null : { token: result.Item.token, card_number: result.Item.card_number, cvv: result.Item.cvv, email: result.Item.email, expiration_month: result.Item.expiration_month, expiration_year: result.Item.expiration_year, expiration_time: result.Item.expiration_time }
    return card
  }

  async saveCardData (cardData: Card): Promise<Card | null> {
    await this._db.put({ TableName: 'CardTable', Item: cardData }).promise() // Insert Card
    return cardData
  }
}
