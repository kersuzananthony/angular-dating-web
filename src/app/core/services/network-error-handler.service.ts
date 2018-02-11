import {Inject, Injectable, InjectionToken} from "@angular/core";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {IStorageService, STORAGE_SERVICE} from "@core/services/storage.service";
import {IMessageService, MESSAGE_SERVICE} from "@core/services/message.service";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {ModelStateError} from "../models/model-state-error.model";
import * as _ from "lodash";
import "rxjs/add/observable/throw";

export const NETWORK_ERROR_HANDLER = new InjectionToken<INetworkErrorHandler>("INetworkErrorHandler");

export interface INetworkErrorHandler {
  handle(response: HttpErrorResponse): Observable<any>;
}

@Injectable()
export class NetworkErrorHandler implements INetworkErrorHandler {

  private static readonly APPLICATION_ERROR_HEADER = "Application-Error";

  constructor(@Inject(STORAGE_SERVICE) private _storageService: IStorageService,
              @Inject(MESSAGE_SERVICE) private _messageService: IMessageService,
              private _router: Router) {}

  public handle(response: HttpErrorResponse): Observable<any> {
    switch (response.status) {
      case 400:
        return this._handleBadRequest(response);
      case 401:
        return this._handleUnauthorized(response);
      case 403:
        return this._handleForbidden();
      case 404:
        return this._handleNotFound();
      case 500:
        return this._handleServerError(response);
      default:
        return Observable.throw(response);
    }
  }

  private _handleBadRequest(err: HttpErrorResponse): Observable<any> {
    if (typeof err.error === "object") {
      const modelStateError = new ModelStateError(err.error);
      return Observable.throw(modelStateError);
    }

    return Observable.throw(err.error);
  }

  private _handleUnauthorized(err: HttpErrorResponse): Observable<any> {
    if (!_.endsWith(err.url, "/login")) {
      this._storageService.setAuthToken(null);

      this._router.navigate(["home"]);
      return Observable.throw("You need to reconnect for accessing to the requested resource.");
    }

    return Observable.throw(err);
  }

  private _handleForbidden(): Observable<any> {
    this._router.navigate(["home"]);
    return Observable.throw("You don't have the permissions for accessing to the requested resource.");
  }

  private _handleNotFound(): Observable<any> {
    return Observable.throw("The requested resource does not exist on the server.");
  }

  private _handleServerError(err: HttpErrorResponse): Observable<any> {
    const applicationError = err.headers.get(NetworkErrorHandler.APPLICATION_ERROR_HEADER);
    if (!isNullOrUndefined(applicationError)) {
      return Observable.throw(applicationError);
    }

    return Observable.throw("An error occurred, please retry later.");
  }
}
