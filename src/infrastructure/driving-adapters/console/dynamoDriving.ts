import { CardUseCase } from '../../../application/usecases/CardUseCase'
import { DynamoDBCardRepository } from '../../implementations/aws/dynamodb/dynamoDBCardRepository'
import * as dotenv from 'dotenv'
import path from 'path'

(async () => {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })
  const cardUseCase = new CardUseCase(new DynamoDBCardRepository())
  console.log('TARJETAS REGISTRADAS: ', await cardUseCase.findAll())
  // console.log('TARJETAS REGISTRADAS: ', await cardUseCase.findAllNew())
  // console.log('! CREANDO TARJETA MOOCK...')
  // const cardCreate = await cardUseCase.saveCardData({ card_number: '4518169258537', cvv: '123', email: 'jorge@gmail.com', expiration_year: '2023', expiration_month: '12' })
  // console.log(cardCreate)
  // console.log('BUSCAR TARJETA BY NUMBER 4518169258537', await cardUseCase.findCardByNumber('4518169258537'))
  // console.log('BUSCAR TARJETA BY TOKEN 8f259cab3131b330', await cardUseCase.findCardByToken('8f259cab3131b330'))
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
})()
