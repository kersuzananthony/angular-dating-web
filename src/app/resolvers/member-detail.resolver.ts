import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {User} from "../models/user.model";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {USER_SERVICE, UserServiceInterface} from "../services/user.service";
import {BaseResolver} from "./base.resolver";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

@Injectable()
export class MemberDetailResolver extends BaseResolver implements Resolve<User> {

  constructor(@Inject(USER_SERVICE) private _userService: UserServiceInterface) {
    super();
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this._userService.getUser(+route.params["id"])
      .catch(() => this._handleError("An error occurred when getting the user.", "members"));
  }
}
