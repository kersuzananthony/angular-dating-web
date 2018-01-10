import {Inject, Injectable} from "@angular/core";
import {BaseResolver} from "./base.resolver";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {User} from "../models/user.model";
import {Observable} from "rxjs/Observable";
import {USER_SERVICE, UserServiceInterface} from "../services/user.service";

@Injectable()
export class MemberListResolver extends BaseResolver implements Resolve<User[]> {

  constructor(@Inject(USER_SERVICE) private _userService: UserServiceInterface) {
    super();
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this._userService.getUsers()
      .catch(() => this._handleError("Cannot get list of users", "home"));
  }
}
