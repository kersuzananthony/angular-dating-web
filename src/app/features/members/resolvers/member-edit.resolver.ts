import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {User} from "@core/models/user.model";
import {of} from "rxjs/observable/of";
import {MemberEditSandbox} from "@members/sandbox/member-edit.sandbox";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/take";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class MemberEditResolver implements Resolve<User> {

  constructor(private _memberEditSandbox: MemberEditSandbox) {
    this._memberEditSandbox.registerEvents();
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    this._memberEditSandbox.loadMember();

    return this._waitForResponse();
  }

  private _waitForResponse(): Observable<User> {
    return Observable.combineLatest(
      this._memberEditSandbox.memberEditLoaded$,
      this._memberEditSandbox.memberEditFailed$,
      this._memberEditSandbox.memberEditData$
    ).filter(([loaded, failed, data]) => (loaded && data !== null) || failed)
      .mergeMap(data => of(data[2]))
      .take(1);
  }
}
