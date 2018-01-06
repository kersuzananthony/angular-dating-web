import {Inject, Injectable, InjectionToken} from "@angular/core";
import {NETWORK_ERROR_HANDLER, NetworkErrorHandlerInterface} from "./network-error-handler.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";

export const NETWORK_SERVICE = new InjectionToken<NetworkServiceInterface>("NetworkServiceInterface");

export interface NetworkServiceInterface {
  get<T>(path: string): Observable<T | {}>;
  post<T>(path: string, payload: any): Observable<T | {}>;
}

@Injectable()
export class NetworkService implements NetworkServiceInterface {

  private _baseUrl: string;

  constructor(private _http: HttpClient,
              @Inject(NETWORK_ERROR_HANDLER) private _errorHandler: NetworkErrorHandlerInterface) {
    this._setBaseUrl();
  }

  public get<T>(path: string): Observable<T | {}> {
    return this._http.get<T>(this._buildUrl(path)).catch(e => this._errorHandler.handle(e));
  }

  public post<T>(path: string, payload: any): Observable<T | {}> {
    return this._http.post<T>(this._buildUrl(path), payload).catch(e => this._errorHandler.handle(e));
  }

  private _buildUrl(path: string): string {
    return `${this._baseUrl}${path}`;
  }

  private _setBaseUrl() {
    this._baseUrl = environment.baseUrl;

    if (!this._baseUrl) {
      throw new Error("Can't find the URL of the backend in configuration");
    }
  }
}
