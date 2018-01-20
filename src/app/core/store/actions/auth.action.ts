import {type} from "@shared/helpers";
import {Action} from "@ngrx/store";
import {LoginRequest} from "../../models/requests/login-request.model";
import {Token} from "../../models/token.model";

export const ActionTypes = {
  DO_LOGIN:             type("[Auth] DoLogin"),
  DO_LOGIN_SUCCESS:     type("[Auth] DoLoginSuccess"),
  DO_LOGIN_FAIL:        type("[Auth] DoLoginFail"),

  DO_LOAD_TOKEN:        type("[Auth] DoCheckLoggedIn"),
  DID_LOAD_TOKEN:       type("[Auth] DidCheckLoggedIn"),

  DO_LOGOUT:            type("[Auth] DoLogout"),
  DO_LOGOUT_SUCCESS:    type("[Auth] DoLogoutSuccess"),
  DO_LOGOUT_FAIL:       type("[Auth] DoLogoutFail"),

  DO_REGISTER:          type("[Auth] DoRegister"),
  DO_REGISTER_SUCCESS:  type("[Auth] DoRegisterSuccess"),
  DO_REGISTER_FAIL:     type("[Auth] DoRegisterFail")
};

/**
 * Login Actions
 */
export class DoLoginAction implements Action {
  public readonly type = ActionTypes.DO_LOGIN;

  constructor(public payload: LoginRequest) {}
}

export class DoLoginSuccessAction implements Action {
  public readonly type = ActionTypes.DO_LOGIN_SUCCESS;

  constructor(public payload: Token) {}
}

export class DoLoginFailAction implements Action {
  public readonly type = ActionTypes.DO_LOGIN_FAIL;

  constructor(public payload: any = null) {}
}

/**
 * Load token
 */
export class DoLoadTokenAction implements Action {
  public readonly type = ActionTypes.DO_LOAD_TOKEN;

  constructor(public payload: any = null) {}
}

export class DidLoadTokenAction implements Action {
  public readonly type = ActionTypes.DID_LOAD_TOKEN;

  constructor(public payload: Token = null) {}
}

/**
 * Logout Actions
 */
export class DoLogoutAction implements Action {
  public readonly type = ActionTypes.DO_LOGOUT;

  constructor(public payload: any = null) {}
}

export class DoLogoutSuccessAction implements Action {
  public readonly type = ActionTypes.DO_LOGOUT_SUCCESS;

  constructor(public payload: any = null) {}
}

export class DoLogoutFailAction implements Action {
  public readonly type = ActionTypes.DO_LOGOUT_FAIL;

  constructor(public payload: any = null) {}
}

/**
 * Register Actions
 */

export type Actions
  = DoLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | DoLoadTokenAction
  | DidLoadTokenAction
  | DoLogoutAction
  | DoLogoutSuccessAction
  | DoLogoutFailAction;


