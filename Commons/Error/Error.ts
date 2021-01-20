import ErrorType from './ErrorType';

export default class Error {
  description: string = '';
  type: ErrorType;

  constructor(type: ErrorType) {
    this.type = type;
    this.applyDescription(type);
  }

  applyDescription(type: ErrorType) {
    switch (type) {
      case ErrorType.none:
        this.description = '';
        break;
      case ErrorType.incorrectUserNameOrPassword:
        break;
    }
  }
}
