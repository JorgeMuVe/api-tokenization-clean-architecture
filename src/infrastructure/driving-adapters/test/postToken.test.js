const lambdaDriving = require('../../../../.build/src/infrastructure/driving-adapters/lambda/LambdaDriving')
const APIGatewayRequest = require('./utils/APIGatewayRequest')
const IsApiGatewayResponse = require('./utils/IsApiGatewayResponse')

test('Test postToken', async () => {
  const event = APIGatewayRequest({
    headers: { authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw' },
    body: { card_number: "4518169258537", cvv: "123", email: "jorge@gmail.com", expiration_year: "2023", expiration_month: "12" }
  })
  await lambdaDriving.postTokenLambda(event, null, (error, res) => {
    console.log(res);
    expect(IsApiGatewayResponse(res)).toEqual(true)
  })
})
