import {Inject, Injectable, InjectionToken} from "@angular/core";
import {NETWORK_SERVICE, NetworkServiceInterface} from "./network.service";
import {STORAGE_SERVICE, StorageServiceInterface} from "./storage.service";
import {LoginRequest} from "../models/requests/login-request.model";
import {LoginResponse} from "../models/responses/login-response.model";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import "rxjs/add/operator/map";
import {RegistrationRequest} from "../models/requests/registration-request.model";

export const AUTH_SERVICE = new InjectionToken<AuthServiceInterface>("AuthServiceInterface");

export interface AuthServiceInterface {
  login(model: LoginRequest): Observable<boolean>;
  register(model: RegistrationRequest): Observable<void>;
  isLoggedIn(): boolean;
  logout(): void;
}

@Injectable()
export class AuthService implements AuthServiceInterface {

  private static readonly ENDPOINT_LOGIN = "auth/login";
  private static readonly ENDPOINT_REGISTER = "auth/register";

  private _userToken: string;

  constructor(@Inject(NETWORK_SERVICE) private _networkService: NetworkServiceInterface,
              @Inject(STORAGE_SERVICE) private _storageService: StorageServiceInterface) {
  }

  public login(model: LoginRequest): Observable<boolean> {
    return this._networkService.post(AuthService.ENDPOINT_LOGIN, model)
      .map((response: LoginResponse) => {
        this._storageService.setAuthToken(response.token);
        this._userToken = response.token;
        return !isNullOrUndefined(response.token);
      });
  }

  public register(model: RegistrationRequest): Observable<void> {
    return this._networkService.post(AuthService.ENDPOINT_REGISTER, model);
  }

  public isLoggedIn(): boolean {
    return !isNullOrUndefined(this._userToken);
  }

  public logout(): void {
    this._storageService.setAuthToken(null);
    this._userToken = null;
  }
}
