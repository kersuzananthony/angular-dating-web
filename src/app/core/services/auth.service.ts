import {Inject, Injectable, InjectionToken} from "@angular/core";
import {NETWORK_SERVICE, INetworkService} from "./network.service";
import {STORAGE_SERVICE, IStorageService} from "./storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoginRequest} from "../models/requests/login-request.model";
import {LoginResponse} from "../models/responses/login-response.model";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {RegistrationRequest} from "../models/requests/registration-request.model";
import "rxjs/add/operator/map";
import {Token} from "../models/token.model";
import {of} from "rxjs/observable/of";

export const AUTH_SERVICE = new InjectionToken<IAuthService>("IAuthService");

export interface IAuthService {
  login(model: LoginRequest): Observable<Token>;
  register(model: RegistrationRequest): Observable<void>;
  loadTokenIfValid(): Observable<Token>;
  logout(): Observable<void>;
}

@Injectable()
export class AuthService implements IAuthService {

  private static readonly ENDPOINT_LOGIN = "auth/login";
  private static readonly ENDPOINT_REGISTER = "auth/register";

  constructor(@Inject(NETWORK_SERVICE) private _networkService: INetworkService,
              @Inject(STORAGE_SERVICE) private _storageService: IStorageService,
              private _jwtHelpersService: JwtHelperService) {
  }

  public login(model: LoginRequest): Observable<Token> {
    return this._networkService.post(AuthService.ENDPOINT_LOGIN, model)
      .map((response: LoginResponse) => {
        this._storageService.setAuthToken(response.token);
        return this._buildToken();
      });
  }

  public register(model: RegistrationRequest): Observable<any> {
    return this._networkService.post(AuthService.ENDPOINT_REGISTER, model);
  }

  public loadTokenIfValid(): Observable<Token> {
    const token = this._jwtHelpersService.tokenGetter();
    if (isNullOrUndefined(token)) return of(null);

    return !this._jwtHelpersService.isTokenExpired(token) ? of(this._buildToken()) : of(null);
  }

  public logout(): Observable<void> {
    return of(this._storageService.setAuthToken(null));
  }

  private _buildToken() {
    const rawToken = this._storageService.getAuthToken();

    return !isNullOrUndefined(rawToken) ? Token.build(rawToken, this._jwtHelpersService.decodeToken(rawToken)) : null;
  }
}
