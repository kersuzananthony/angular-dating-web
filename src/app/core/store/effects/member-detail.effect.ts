import {Inject, Injectable} from "@angular/core";
import {IUserService, USER_SERVICE} from "@core/services/user.service";
import {Actions, Effect} from "@ngrx/effects";
import * as store from "@core/store";
import * as memberDetailActions from "@core/store/actions/member-detail.action";
import {Observable} from "rxjs/Observable";
import {Action, Store} from "@ngrx/store";
import {of} from "rxjs/observable/of";

@Injectable()
export class MemberDetailEffects {

  constructor(@Inject(USER_SERVICE) private _userService: IUserService,
              private _actions$: Actions,
              private _appState$: Store<store.State>) {}

  @Effect()
  public doFetch$(): Observable<Action> {
    return this._actions$.ofType(memberDetailActions.ActionTypes.DO_FETCH)
      .map((action: memberDetailActions.DoFetchAction) => action.payload)
      .switchMap(payload => {
        return this._userService.getUser(payload)
          .map(user => new memberDetailActions.DoFetchSuccessAction(user))
          .catch(() => of(new memberDetailActions.DoFetchFailAction()));
      });
  }

  @Effect()
  public doLike$(): Observable<Action> {
    return this._actions$.ofType(memberDetailActions.ActionTypes.DO_LIKE)
      .mergeMap(() => {
        return Observable.combineLatest(
          this._appState$.select(store.getMembersDetailData).take(1),
          this._appState$.select(store.getAuthToken).take(1)
        );
      })
      .switchMap(([user, token]) => {
        return this._userService.sendLike(token, user.id)
          .map(() => new memberDetailActions.DoLikeSuccessAction())
          .catch(err => of(new memberDetailActions.DoLikeFailAction(err || "An error occurred")));
      });
  }
}
