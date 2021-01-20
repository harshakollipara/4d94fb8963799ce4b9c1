import BaseAPIClient from './BaseAPIClient';

export default class PostLoginBaseAPIClient extends BaseAPIClient {
  static sharedClient = new PostLoginBaseAPIClient();

  requestHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }
}
