import {Injectable, InjectionToken} from "@angular/core";
import {isNullOrUndefined} from "util";

export const STORAGE_SERVICE = new InjectionToken<StorageServiceInterface>("StorageServiceInterface");

export interface StorageServiceInterface {
  getAuthToken(): string;
  setAuthToken(token: string): void;
}

@Injectable()
export class StorageService implements StorageServiceInterface {

  private static readonly KEY_AUTH_TOKEN = "accessToken";

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
    return this._getLocalData(StorageService.KEY_AUTH_TOKEN);
  }

  public setAuthToken(token: string): void {
    this._setLocalData(StorageService.KEY_AUTH_TOKEN, token);
  }
}
