import {Inject, Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {STORAGE_SERVICE, StorageServiceInterface} from "../storage.service";
import {NETWORK_ERROR_HANDLER, NetworkErrorHandlerInterface} from "../network-error-handler.service";
import * as _ from "lodash";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/empty";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(@Inject(STORAGE_SERVICE) private _storageService: StorageServiceInterface,
              @Inject(NETWORK_ERROR_HANDLER) private _networkErrorHandler: NetworkErrorHandlerInterface,
              private _router: Router) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
            return this._handleBadRequest(err);
          case 401:
            return this._handleUnauthorizedResponse(err);
          default:
            return Observable.throw(err);
        }
      });
  }

  private _handleBadRequest(err: HttpErrorResponse): Observable<any> {
    return this._networkErrorHandler.handle(err);
  }

  private _handleUnauthorizedResponse(err: HttpErrorResponse): Observable<any> {
    if ((err.status === 401) && !_.endsWith(err.url, "/login")) {
      if (!isNullOrUndefined(this._storageService.getAuthToken())) {
        this._storageService.setAuthToken(null);
      }

      this._router.navigate(["home"]);
      return Observable.empty();
    }

    return Observable.throw(err);
  }
}
