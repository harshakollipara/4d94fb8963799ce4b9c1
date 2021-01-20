import Error from './Error';

export default class ErrorHandler {
  static handleError(error: Error, reject: any) {
    const isOfTypeError = error instanceof Error;
    if (isOfTypeError) {
      reject(error);
      return;
    }
  }
}
