import { CardUseCase } from '../../../application/usecases/CardUseCase'
import { LocalCardRepository } from '../../implementations/local/localCardRepository'

(async () => {
  const cardUseCase = new CardUseCase(new LocalCardRepository())
  console.log('TARJETAS REGISTRADAS: ', await cardUseCase.findAll())
  console.log('! CREANDO TARJETA MOOCK...')
  console.log(await cardUseCase.saveCardData({ card_number: '4518169258537', cvv: '123', email: 'jorge@gmail.com', expiration_year: '2023', expiration_month: '12' }))
  console.log(await cardUseCase.saveCardData({
    card_number: '4518169258537',
    cvv: '123',
    email: 'jorge@gmail.com',
    expiration_year: '2023',
    expiration_month: '12'
  }))
  console.log('TARJETAS REGISTRADAS: ', await cardUseCase.findAll())
  console.log('BUSCAR TARJETA BY NUMBER string', await cardUseCase.findCardByNumber('4518169258537'))
  console.log('BUSCAR TARJETA BY TOKEN string', await cardUseCase.findCardByToken('string'))
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
})()
