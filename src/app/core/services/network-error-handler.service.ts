import {Injectable, InjectionToken} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {ModelStateError} from "../models/model-state-error.model";
import "rxjs/add/observable/throw";

export const NETWORK_ERROR_HANDLER = new InjectionToken<INetworkErrorHandler>("INetworkErrorHandler");

export interface INetworkErrorHandler {
  handle(response: HttpErrorResponse);
}

@Injectable()
export class NetworkErrorHandler implements INetworkErrorHandler {

  private static readonly APPLICATION_ERROR_HEADER = "Application-Error";

  public handle(response: HttpErrorResponse): Observable<any> {
    const applicationError = response.headers.get(NetworkErrorHandler.APPLICATION_ERROR_HEADER);
    if (!isNullOrUndefined(applicationError)) {
      return Observable.throw(applicationError);
    }

    const modelStateError = new ModelStateError(response.error);
    return Observable.throw(modelStateError);
  }
}
