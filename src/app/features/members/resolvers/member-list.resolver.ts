import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {BaseResolver} from "../../../shared/resolvers/base.resolver";
import {User} from "../../../core/models/user.model";
import {USER_SERVICE, IUserService} from "../../../core/services/user.service";

@Injectable()
export class MemberListResolver extends BaseResolver implements Resolve<User[]> {

  constructor(@Inject(USER_SERVICE) private _userService: IUserService) {
    super();
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this._userService.getUsers()
      .catch(() => this._handleError("Cannot get list of users", "home"));
  }
}
