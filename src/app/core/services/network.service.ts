import {environment} from "../../../environments/environment";
import {Injectable, InjectionToken} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";

export const NETWORK_SERVICE = new InjectionToken<INetworkService>("INetworkService");

export interface INetworkService {
  get<T>(path: string): Observable<T>;
  post<T>(path: string, payload: any): Observable<T>;
  put<T>(path: string, payload: any): Observable<T>;
  delete<T>(path: string): Observable<T>;
}

@Injectable()
export class NetworkService implements INetworkService {

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

  public put<T>(path: string, payload: any): Observable<T> {
    return this._http.put<T>(this._buildUrl(path), payload);
  }

  public delete<T>(path: string): Observable<T> {
    return this._http.delete<T>(this._buildUrl(path));
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
