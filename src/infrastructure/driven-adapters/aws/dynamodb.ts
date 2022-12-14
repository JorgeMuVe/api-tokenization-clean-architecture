import AWS from './aws'

export class DynamoDB {
  public TABLE_CARD_NAME: string = 'CardTable'
  private static _INSTANCE: AWS.DynamoDB.DocumentClient

  static getInstace (options?: any): AWS.DynamoDB.DocumentClient {
    if (process?.env?.JEST_WORKER_ID !== undefined) { // If testing mode
      options = { endpoint: 'http://localhost:8000', region: 'local-env', sslEnabled: false, accessKeyId: 'XXXXXX', secretAccessKey: 'XXXXX' }
    }
    if (this._INSTANCE === undefined) {
      this._INSTANCE = new AWS.DynamoDB.DocumentClient(options)
    }
    return this._INSTANCE
  }
}
