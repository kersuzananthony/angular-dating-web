import {Inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {STORAGE_SERVICE, IStorageService} from "../storage.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private static readonly HEADER_PREFIX: string = "bearer";

  constructor(@Inject(STORAGE_SERVICE) private _storageService: IStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._storageService.getAuthToken();
    if (!!token && token.length > 0 && !req.headers.get("Authorization")) {
      const authRequest = req.clone({headers: req.headers.set("Authorization", `${AuthInterceptor.HEADER_PREFIX} ${token}`)});
      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
