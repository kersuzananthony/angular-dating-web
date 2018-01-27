import {Inject, Injectable} from "@angular/core";
import {AUTH_SERVICE, IAuthService} from "../../services/auth.service";
import {IUserService, USER_SERVICE} from "@core/services/user.service";
import {Action, Store} from "@ngrx/store";
import * as store from "../../store";
import * as actions from "../actions/auth.action";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {LoginRequest} from "../../models/requests/login-request.model";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/switchMap";

@Injectable()
export class AuthEffects {

  constructor(@Inject(AUTH_SERVICE) private _authService: IAuthService,
              @Inject(USER_SERVICE) private _userService: IUserService,
              private _appState$: Store<store.State>,
              private _actions$: Actions) {}

  /**
   * Login Effects
   */
  @Effect()
  public doLogin$(): Observable<Action> {
    return this._actions$.ofType(actions.ActionTypes.DO_LOGIN)
      .map((action: actions.DoLoginAction) => action.payload)
      .switchMap((payload: LoginRequest) => {
        return this._authService.login(payload)
          .map(response => new actions.DoLoginSuccessAction(response))
          .catch(error => of(new actions.DoLoginFailAction()));
      });
  }

  /**
   * Check Load token effect
   */
  @Effect()
  public doCheckLogin$(): Observable<Action> {
    return this._actions$.ofType(actions.ActionTypes.DO_LOAD_TOKEN)
      .mergeMap(() => this._authService.loadTokenIfValid())
      .map(token => new actions.DidLoadTokenAction(token));
  }

  @Effect()
  public didCheckLogin$(): Observable<Action> {
    return this._actions$.ofType(actions.ActionTypes.DID_LOAD_TOKEN)
      .map((action: actions.DidLoadTokenAction) => action.payload)
      .map((token) => new actions.DoLoadUserAction(token));
  }

  /**
   * Load User Effect
   */
  @Effect()
  public doLoadUser$(): Observable<Action> {
    return this._actions$.ofType(actions.ActionTypes.DO_LOAD_USER)
      .map((action: actions.DoLoadUserAction) => action.payload)
      .switchMap(token => {
        return this._userService.getUserByToken(token)
          .map(user => new actions.DoLoadUserSuccessAction(user))
          .catch(() => of(new actions.DoLoadUserFailAction()));
      });
  }

  /**
   * Registration Effect
   */
  @Effect()
  public doRegister$(): Observable<Action> {
    return this._actions$.ofType(actions.ActionTypes.DO_REGISTER)
      .map((action: actions.DoRegisterAction) => action.payload)
      .switchMap(payload => {
        return this._authService.register(payload)
          .map(() => new actions.DoRegisterSuccessAction())
          .catch(err => of(new actions.DoRegisterFailAction(err)));
      });
  }

  /**
   * Logout Effect
   */
  @Effect()
  public doLogout$(): Observable<Action> {
    return this._actions$.ofType(actions.ActionTypes.DO_LOGOUT)
      .switchMap(() => {
        return this._authService.logout()
          .map(() => new actions.DoLogoutSuccessAction())
          .catch(() => of(new actions.DoLogoutFailAction()));
      });
  }
}
