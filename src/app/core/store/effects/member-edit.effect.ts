import {Inject, Injectable} from "@angular/core";
import {IUserService, USER_SERVICE} from "@core/services/user.service";
import {Actions, Effect} from "@ngrx/effects";
import * as store from "@core/store";
import * as memberEditActions from "@core/store/actions/member-edit.action";
import {Observable} from "rxjs/Observable";
import {Action, Store} from "@ngrx/store";
import {of} from "rxjs/observable/of";
import {getAuthToken} from "@core/store";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/take";
import "rxjs/add/observable/combineLatest";

@Injectable()
export class MemberEditEffects {

  constructor(@Inject(USER_SERVICE) private _userService: IUserService,
              private _actions$: Actions,
              private _appState$: Store<store.State>) {}

  @Effect()
  public doFetch$(): Observable<Action> {
    return this._actions$.ofType(memberEditActions.ActionTypes.DO_LOAD)
      .map((action: memberEditActions.DoLoadAction) => action.payload)
      .switchMap(payload => {
        return this._userService.getUser(payload)
          .map(user => new memberEditActions.DoLoadSuccessAction(user))
          .catch(() => of(new memberEditActions.DoLoadFailAction()));
      });
  }

  @Effect()
  public doUpdate$(): Observable<Action> {
    return this._actions$.ofType(memberEditActions.ActionTypes.DO_UPDATE)
      .mergeMap((action: memberEditActions.DoUpdateAction) => {
        return Observable.combineLatest(
          of(action.payload),
          this._appState$.select(getAuthToken).take(1)
        );
      })
      .switchMap(([payload, token]) => {
        return this._userService.updateUser(token, payload)
          .map(() => new memberEditActions.DoUpdateSuccessAction())
          .catch(error => of(new memberEditActions.DoUpdateFailAction(error)));
      });
  }
}
