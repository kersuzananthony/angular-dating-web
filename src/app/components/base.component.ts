import {ModelStateError} from "../models/model-state-error.model";

export abstract class BaseComponent {

  private _modelStateError: ModelStateError;

  get modelStateError(): ModelStateError {
    return this._modelStateError;
  }

  protected _handleError(error: any) {
    this._clearError();
    if (error instanceof ModelStateError) {
      this._modelStateError = error;
      return;
    }

    alert(error);
  }

  protected _clearError() {
    this._modelStateError = null;
  }
}
