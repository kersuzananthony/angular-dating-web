import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BaseResolver} from "../../../shared/resolvers/base.resolver";
import {User} from "../../../core/models/user.model";
import {USER_SERVICE, IUserService} from "../../../core/services/user.service";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

@Injectable()
export class MemberDetailResolver extends BaseResolver implements Resolve<User> {

  constructor(@Inject(USER_SERVICE) private _userService: IUserService) {
    super();
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this._userService.getUser(+route.params["id"])
      .catch(() => this._handleError("An error occurred when getting the user.", "members"));
  }
}
