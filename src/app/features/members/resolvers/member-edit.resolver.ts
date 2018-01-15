import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import "rxjs/add/observable/of";
import {BaseResolver} from "../../../shared/resolvers/base.resolver";
import {User} from "../../../core/models/user.model";
import {USER_SERVICE, IUserService} from "../../../core/services/user.service";
import {AUTH_SERVICE, IAuthService} from "../../../core/services/auth.service";

@Injectable()
export class MemberEditResolver extends BaseResolver implements Resolve<User> {

  constructor(@Inject(USER_SERVICE) private _userService: IUserService,
              @Inject(AUTH_SERVICE) private _authService: IAuthService) {
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
