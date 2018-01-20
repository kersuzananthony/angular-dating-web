import {ModelStateError} from "@app/core/models/model-state-error.model";
import {MESSAGE_SERVICE, IMessageService} from "@app/core/services/message.service";
import {ServiceLocator} from "@app/service-locator";

export abstract class BaseComponent {

  private _modelStateError: ModelStateError;

  protected readonly _messageService: IMessageService;

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