import {Inject, Injectable, InjectionToken} from "@angular/core";
import {NETWORK_SERVICE, NetworkServiceInterface} from "./network.service";
import {STORAGE_SERVICE, StorageServiceInterface} from "./storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoginRequest} from "../models/requests/login-request.model";
import {LoginResponse} from "../models/responses/login-response.model";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {RegistrationRequest} from "../models/requests/registration-request.model";
import "rxjs/add/operator/map";
import {Token} from "../models/token.model";

export const AUTH_SERVICE = new InjectionToken<AuthServiceInterface>("AuthServiceInterface");

export interface AuthServiceInterface {
  initialize();
  login(model: LoginRequest): Observable<Token>;
  register(model: RegistrationRequest): Observable<void>;
  isLoggedIn(): boolean;
  getToken(): Token;
  logout(): void;
}

@Injectable()
export class AuthService implements AuthServiceInterface {

  private static readonly ENDPOINT_LOGIN = "auth/login";
  private static readonly ENDPOINT_REGISTER = "auth/register";

  private _token: Token;

  constructor(@Inject(NETWORK_SERVICE) private _networkService: NetworkServiceInterface,
              @Inject(STORAGE_SERVICE) private _storageService: StorageServiceInterface,
              private _jwtHelpersService: JwtHelperService) {
  }

  public initialize() {
    this._setToken();
  }

  public login(model: LoginRequest): Observable<Token> {
    return this._networkService.post(AuthService.ENDPOINT_LOGIN, model)
      .map((response: LoginResponse) => {
        this._storageService.setAuthToken(response.token);
        this._setToken();
        return this._token;
      });
  }

  public register(model: RegistrationRequest): Observable<any> {
    return this._networkService.post(AuthService.ENDPOINT_REGISTER, model);
  }

  public isLoggedIn(): boolean {
    const token = this._jwtHelpersService.tokenGetter();
    if (isNullOrUndefined(token)) return false;


    return !this._jwtHelpersService.isTokenExpired(token);
  }

  public getToken(): Token {
    return this._token;
  }

  public logout(): void {
    this._storageService.setAuthToken(null);
    this._token = null;
  }

  private _setToken() {
    const rawToken = this._storageService.getAuthToken();
    if (!isNullOrUndefined(rawToken)) {
      this._token = Token.build(rawToken, this._jwtHelpersService.decodeToken(rawToken));
    }
  }
}
