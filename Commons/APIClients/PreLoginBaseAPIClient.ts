import BaseAPIClient from './BaseAPIClient.js';

export default class PreLoginBaseAPIClient extends BaseAPIClient {
  static sharedClient = new PreLoginBaseAPIClient();

  requestHeaders() {
    return {'Content-Type': 'application/json'};
  }
}
