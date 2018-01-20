import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "@core/models/user.model";
import {MemberDetailSandbox} from "@members/sandbox/member-detail.sandbox";
import {isNullOrUndefined} from "util";
import {of} from "rxjs/observable/of";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/take";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

  constructor(private _memberDetailSandbox: MemberDetailSandbox) {
    this._memberDetailSandbox.registerEvents();
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    if (isNullOrUndefined(route.params["id"])) {
      this._memberDetailSandbox.throwError();
      return of(null);
    }

    this._memberDetailSandbox.loadMemberDetail(+route.params["id"]);

    return this._waitForResponse();
  }

  private _waitForResponse(): Observable<User> {
    return Observable.combineLatest(
      this._memberDetailSandbox.memberDetailLoaded$,
      this._memberDetailSandbox.memberDetailFailed$,
      this._memberDetailSandbox.memberDetailData$
    ).filter(([loaded, failed, data]) => (loaded && data !== null) || failed)
      .mergeMap(data => of(data[2]))
      .take(1);
  }
}
