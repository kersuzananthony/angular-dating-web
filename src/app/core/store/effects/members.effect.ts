import {Inject, Injectable} from "@angular/core";
import {IUserService, USER_SERVICE} from "@core/services/user.service";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action, Store} from "@ngrx/store";
import * as store from "@core/store";
import * as membersActions from "@core/store/actions/members.action";
import {of} from "rxjs/observable/of";

@Injectable()
export class MembersEffects {

  constructor(@Inject(USER_SERVICE) private _userService: IUserService,
              private _actions$: Actions,
              private _appState$: Store<store.State>) {}

  @Effect()
  public doFetch$(): Observable<Action> {
    return this._actions$.ofType(membersActions.ActionTypes.DO_FETCH)
      .switchMap(() => {
        return this._userService.getUsers()
          .map(users => new membersActions.DoFetchActionSuccess(users))
          .catch(() => of(new membersActions.DoFetchActionFail()));
      });
  }
}
