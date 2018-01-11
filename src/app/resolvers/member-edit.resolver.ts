import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {BaseResolver} from "./base.resolver";
import {USER_SERVICE, UserServiceInterface} from "../services/user.service";
import {User} from "../models/user.model";
import {AUTH_SERVICE, AuthServiceInterface} from "../services/auth.service";
import {isNullOrUndefined} from "util";
import "rxjs/add/observable/of";

@Injectable()
export class MemberEditResolver extends BaseResolver implements Resolve<User> {

  constructor(@Inject(USER_SERVICE) private _userService: UserServiceInterface,
              @Inject(AUTH_SERVICE) private _authService: AuthServiceInterface) {
    super();
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const token = this._authService.getToken();
    if (isNullOrUndefined(token) || isNullOrUndefined(token.decodedToken.nameid)) {
      return Observable.of(null);
    }

    return this._userService.getUser(token.decodedToken.nameid)
      .catch(() => this._handleError("An error occurred when getting the user.", "members"));
  }
}
