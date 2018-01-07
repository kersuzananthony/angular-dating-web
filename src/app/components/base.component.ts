import {ModelStateError} from "../models/model-state-error.model";
import {MESSAGE_SERVICE, MessageServiceInterface} from "../services/message.service";
import {ServiceLocator} from "../service-locator";

export abstract class BaseComponent {

  private _modelStateError: ModelStateError;

  protected readonly _messageService: MessageServiceInterface;

  constructor() {
    this._messageService = ServiceLocator.getInjector().get(MESSAGE_SERVICE);
  }

  get modelStateError(): ModelStateError {
    return this._modelStateError;
  }

  protected _handleError(error: any) {
    this._clearError();
    if (error instanceof ModelStateError) {
      this._modelStateError = error;
      return;
    }

    this._messageService.error(<any>error);
  }

  protected _clearError() {
    this._modelStateError = null;
  }
}
