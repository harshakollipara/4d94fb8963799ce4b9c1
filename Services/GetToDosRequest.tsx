import PostLoginBaseAPIClient from '../Commons/APIClients/PostLoginBaseAPIClient';
import Error from '../Commons/Error/Error';
import ErrorHandler from '../Commons/Error/ErrorHandler';
import ErrorType from '../Commons/Error/ErrorType';

export default class GetToDosRequest {
  async getToDos() {
    try {
      const response = await PostLoginBaseAPIClient.sharedClient.get('/contacts.json');
      return response.data;
    } catch (err) {
      const fetchingToDoFailedError = new Error(ErrorType.none);
      const reject = () => {
        return fetchingToDoFailedError;
      };

      ErrorHandler.handleError(fetchingToDoFailedError, reject);
    }
  }
}
