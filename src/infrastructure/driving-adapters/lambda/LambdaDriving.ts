import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CardUseCase } from '../../../application/usecases/CardUseCase'
import { DynamoDBCardRepository } from '../../implementations/aws/dynamodb/dynamoDBCardRepository'
// import { cardControllerInstance } from '../controllers/card.controller'
// import { validateTokenInstance } from '../utils/validate.token'
// import { generateResponse } from '../utils/generate.response'
// import { generateResponse } from './utils/generateResponse'
import { ValidateCard } from '../../../domain/services/ValidateCard'
import { Card } from '../../../domain/entities/Card'

const generateResponse = (statusCode: number, body: any): APIGatewayProxyResult => {
  return { headers: { /* 'Content-Type': 'application/json' */ }, statusCode, body: JSON.stringify(body) }
}

/**
 * @description Funcion Lambda para buscar tarjeta por token
 * @returns Callback con respuesta
 */
export const getTokenLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateResponse(400, ['Vuelva a intentarlo'])
  try {
    const token = event?.pathParameters?.token // Get Token from pathParameters '3f033a74fbe60a24'
    const tokenAuth = event?.headers?.authorization // Get Pk Bearer from headers 'Bearer pk_test_LsRBKejzCOEEWOsw'
    const validateCard = new ValidateCard()
    if (tokenAuth !== undefined && validateCard.validateBearerToken(tokenAuth)) { // Validate Pk Bearer
      if (token !== undefined) { // If exists token
        const cardUseCase = new CardUseCase(new DynamoDBCardRepository())
        const cardFound = await cardUseCase.findCardByToken(token) // Search Card by Token
        response = generateResponse(cardFound.statusCode, cardFound.body)
      }
    } else { response = generateResponse(401, ['Token de negocio no autorizado']) }
  } catch (error) { console.log(error) } // Print error console

  callback(null, response)
}

/**
 * @description Funcion Lambda para tokenizar tarjeta
 * @returns Callback con respuesta
 */
export const postTokenLambda = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
  let response: APIGatewayProxyResult = generateResponse(400, ['Vuelva a intentarlo'])
  try {
    const tokenAuth = event?.headers?.authorization // Get Pk Bearer from headers
    const body = event?.body // Get Pk Bearer from headers
    const validateCard = new ValidateCard()
    if (tokenAuth !== undefined && validateCard.validateBearerToken(tokenAuth)) { // Validate Pk Bearer
      if (body !== undefined && body !== null) { // Validate body
        const postCard: Card = JSON.parse(body)
        const cardUseCase = new CardUseCase(new DynamoDBCardRepository())
        const cardSafe = await cardUseCase.saveCardData(postCard) // Save tokenization card
        response = generateResponse(cardSafe.statusCode, cardSafe.body)
      }
    } else { response = generateResponse(401, ['Token de negocio no autorizado']) }
  } catch (error) { console.log(error) }

  callback(null, response)
}
