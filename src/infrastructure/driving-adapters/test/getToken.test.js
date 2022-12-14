const lambdaDriving = require('../../../../.build/src/infrastructure/driving-adapters/lambda/LambdaDriving')
const APIGatewayRequest = require('./utils/APIGatewayRequest')
const IsApiGatewayResponse = require('./utils/IsApiGatewayResponse')

test('Test getToken', async () => {
  const event = APIGatewayRequest({ pathParametersObject: { token: 'bbcb8ba614e357ed' }, headers: { authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw' } })
  await lambdaDriving.getTokenLambda(event, null, (error, res) => {
    console.log(res);
    expect(IsApiGatewayResponse(res)).toEqual(true)
  })
})