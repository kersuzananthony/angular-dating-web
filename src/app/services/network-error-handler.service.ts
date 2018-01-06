import {Injectable, InjectionToken} from "@angular/core";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {ModelStateError} from "../models/model-state-error.model";
import "rxjs/add/observable/throw";

export const NETWORK_ERROR_HANDLER = new InjectionToken<NetworkErrorHandlerInterface>("NetworkHandlerInterface");

export interface NetworkErrorHandlerInterface {
  handle(response: HttpErrorResponse);
}

@Injectable()
export class NetworkErrorHandler implements NetworkErrorHandlerInterface {

  private static readonly APPLICATION_ERROR_HEADER = "Application-Error";

  public handle(response: HttpErrorResponse) {
    const applicationError = response.headers.get(NetworkErrorHandler.APPLICATION_ERROR_HEADER);
    if (!isNullOrUndefined(applicationError)) {
      return Observable.throw(applicationError);
    }

    const modelStateError = new ModelStateError(response.error);
    return Observable.throw(modelStateError);
  }
}
