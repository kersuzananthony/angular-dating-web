import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {User} from "@core/models/user.model";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";

@Injectable()
export class ApplicationEventBus {

  private _userUpdated$ = new Subject<User>();
  get userUpdate$(): Observable<User> { return this._userUpdated$.asObservable(); }

  public updateUser(user: User) {
    if (!isNullOrUndefined(user)) this._userUpdated$.next(user);
  }
}
