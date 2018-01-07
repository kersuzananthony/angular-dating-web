import {Inject, Injectable, InjectionToken} from "@angular/core";
import {isNullOrUndefined} from "util";

export const STORAGE_SERVICE = new InjectionToken<StorageServiceInterface>("StorageServiceInterface");
export const KEY_AUTH_TOKEN = new InjectionToken<string>("access_token");

export interface StorageServiceInterface {
  getAuthToken(): string;
  setAuthToken(token: string): void;
}

@Injectable()
export class StorageService implements StorageServiceInterface {

  constructor(@Inject(KEY_AUTH_TOKEN) private _keyAuthToken) {}

  private _getLocalData(key: string): any {
    return localStorage.getItem(key);
  }

  private _setLocalData(key: string, data: any): void {
    if (isNullOrUndefined(data)) {
      return this._removeLocalData(key);
    } else {
      return localStorage.setItem(key, data);
    }
  }

  private _removeLocalData(key: string): void {
    return localStorage.removeItem(key);
  }

  public getAuthToken(): string {
    return this._getLocalData(this._keyAuthToken);
  }

  public setAuthToken(token: string): void {
    this._setLocalData(this._keyAuthToken, token);
  }
}
