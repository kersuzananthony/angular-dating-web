import {Inject, Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NETWORK_ERROR_HANDLER, INetworkErrorHandler} from "../network-error-handler.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(@Inject(NETWORK_ERROR_HANDLER) private _networkErrorHandler: INetworkErrorHandler) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((err: HttpErrorResponse) => this._networkErrorHandler.handle(err));
  }
}
