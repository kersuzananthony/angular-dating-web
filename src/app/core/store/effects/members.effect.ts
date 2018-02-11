import {Inject, Injectable} from "@angular/core";
import {IUserService, USER_SERVICE} from "@core/services/user.service";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action, Store} from "@ngrx/store";
import {of} from "rxjs/observable/of";
import {isNullOrUndefined} from "util";
import {INITIAL_FILTER, INITIAL_USER_QUERY} from "../reducers/members.reducer";
import * as membersActions from "@core/store/actions/members.action";
import * as store from "@core/store";
import * as User from "@core/models/user.model";
import {getAuthToken} from "@core/store";

@Injectable()
export class MembersEffects {

  constructor(@Inject(USER_SERVICE) private _userService: IUserService,
              private _actions$: Actions,
              private _appState$: Store<store.State>) {}

  @Effect()
  public doFetch$(): Observable<Action> {
    return this._actions$.ofType(membersActions.ActionTypes.DO_FETCH)
      .mergeMap(() => this._appState$.select(store.getMembersQuery).take(1))
      .switchMap(query => {
        return this._userService.getUsers(query)
          .map(users => new membersActions.DoFetchActionSuccess(users))
          .catch(() => of(new membersActions.DoFetchActionFail()));
      });
  }

  @Effect()
  public doUpdateQuery$(): Observable<Action> {
    return this._actions$.ofType(membersActions.ActionTypes.DO_UPDATE_QUERY)
      .map(() => new membersActions.DoFetchAction());
  }

  @Effect()
  public doLoadQuery$(): Observable<Action> {
    return this._actions$.ofType(membersActions.ActionTypes.DO_LOAD_QUERY)
      .mergeMap(() => this._appState$.select(store.getAuthUser).take(1))
      .map(user => !isNullOrUndefined(user) ? (user.gender === User.MALE ? User.FEMALE : User.MALE) : User.MALE)
      .map(gender => new membersActions.DoUpdateQueryAction({...INITIAL_USER_QUERY, gender}));
  }

  @Effect()
  public doResetFilter$(): Observable<Action> {
    return this._actions$.ofType(membersActions.ActionTypes.DO_RESET_FILTERS)
      .mergeMap(() => this._appState$.select(store.getAuthUser).take(1))
      .map(user => !isNullOrUndefined(user) ? (user.gender === User.MALE ? User.FEMALE : User.MALE) : User.MALE)
      .map(gender => new membersActions.DoUpdateQueryAction({...INITIAL_FILTER, gender}));
  }

  @Effect()
  public doLikeUser$(): Observable<Action> {
    return this._actions$.ofType(membersActions.ActionTypes.DO_LIKE)
      .mergeMap((action: membersActions.DoLikeAction) => {
        return Observable.combineLatest(
          of(action.payload),
          this._appState$.select(getAuthToken).take(1)
        );
      })
      .switchMap(([user, token]) => {
        return this._userService.sendLike(token, user.id)
          .map(() => new membersActions.DoLikeSuccessAction())
          .catch(error => of(new membersActions.DoLikeFailAction(error || "An error occurred")));
      });
  }
}
