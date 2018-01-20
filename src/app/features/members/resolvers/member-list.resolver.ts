import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {User} from "@core/models/user.model";
import {MembersSandbox} from "@members/sandbox/members.sandbox";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/take";
import {isNullOrUndefined} from "util";

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

  constructor(private _membersSandbox: MembersSandbox) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    this._membersSandbox.loadUsers();

    return this._waitForResponse();
  }

  private _waitForResponse(): Observable<User[]> {
    return Observable.combineLatest(
      this._membersSandbox.membersLoaded$,
      this._membersSandbox.membersFailed$,
      this._membersSandbox.membersData$
    )
      .filter(([loaded, failed, data]) => (loaded && !isNullOrUndefined(data) || failed))
      .mergeMap(([loaded, failed, data]) => of(data))
      .take(1);
  }
}
