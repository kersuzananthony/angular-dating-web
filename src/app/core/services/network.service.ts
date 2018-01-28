import {environment} from "../../../environments/environment";
import {Injectable, InjectionToken} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import {isNullOrUndefined} from "util";

export const NETWORK_SERVICE = new InjectionToken<INetworkService>("INetworkService");

export interface INetworkService {
  get<T>(path: string, query?: {[key: string]: any}): Observable<T>;
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

  public get<T>(path: string, query?: {[key: string]: any}): Observable<T> {
    return this._http.get<T>(this._buildUrl(path, query));
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

  private _buildUrl(path: string, query?: {[key: string]: any}): string {
    if (isNullOrUndefined(query) || Object.keys(query).length < 1) return `${this._baseUrl}${path}`;

    const queryParams = [];
    for (const key of Object.keys(query)) {
      const value = query[key];
      if (!isNullOrUndefined(value) && value.toString().trim() !== "") {
        queryParams.push(`${encodeURI(key)}=${encodeURI(value)}`);
      }
    }

    return `${this._baseUrl}${path}?${queryParams.join("&")}`;
  }

  private _setBaseUrl() {
    this._baseUrl = environment.baseUrl;

    if (!this._baseUrl) {
      throw new Error("Can't find the URL of the backend in configuration");
    }
  }
}
