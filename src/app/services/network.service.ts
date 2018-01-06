import {Injectable, InjectionToken} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export const NETWORK_SERVICE = new InjectionToken<NetworkServiceInterface>("NetworkServiceInterface");

export interface NetworkServiceInterface {
  get<T>(path: string): Observable<T>;
  post<T>(path: string, payload: any): Observable<T>;
}

@Injectable()
export class NetworkService implements NetworkServiceInterface {

  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._setBaseUrl();
  }

  public get<T>(path: string): Observable<T> {
    return this._http.get<T>(this._buildUrl(path));
  }

  public post<T>(path: string, payload: any): Observable<T> {
    return this._http.post<T>(this._buildUrl(path), payload);
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
