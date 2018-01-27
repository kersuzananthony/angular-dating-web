import {type} from "@shared/helpers";
import {Action} from "@ngrx/store";
import {LoginRequest} from "../../models/requests/login-request.model";
import {Token} from "../../models/token.model";
import {RegistrationRequest} from "@core/models/requests/registration-request.model";
import {User} from "@core/models/user.model";

export const ActionTypes = {
  DO_LOGIN:             type("[Auth] DoLogin"),
  DO_LOGIN_SUCCESS:     type("[Auth] DoLoginSuccess"),
  DO_LOGIN_FAIL:        type("[Auth] DoLoginFail"),
  DO_UNLOAD_LOGIN:      type("[Auth] DoUnloadLogin"),

  DO_LOAD_TOKEN:        type("[Auth] DoCheckLoggedIn"),
  DID_LOAD_TOKEN:       type("[Auth] DidCheckLoggedIn"),

  DO_LOAD_USER:         type("[Auth] DoLoadUser"),
  DO_LOAD_USER_SUCCESS: type("[Auth] DoLoadUserSuccess"),
  DO_LOAD_USER_FAIL:    type("[Auth] DoLoadUserFail"),

  DO_LOGOUT:            type("[Auth] DoLogout"),
  DO_LOGOUT_SUCCESS:    type("[Auth] DoLogoutSuccess"),
  DO_LOGOUT_FAIL:       type("[Auth] DoLogoutFail"),

  DO_REGISTER:          type("[Auth] DoRegister"),
  DO_REGISTER_SUCCESS:  type("[Auth] DoRegisterSuccess"),
  DO_REGISTER_FAIL:     type("[Auth] DoRegisterFail"),
  DO_UNLOAD_REGISTER:   type("[Auth] DoUnloadRegister")
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

  constructor(public payload: {token: Token, user?: User}) {}
}

export class DoLoginFailAction implements Action {
  public readonly type = ActionTypes.DO_LOGIN_FAIL;

  constructor(public payload: any = null) {}
}

export class DoUnloadLogin implements Action {
  public readonly type = ActionTypes.DO_UNLOAD_LOGIN;

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
 * Load User
 */
export class DoLoadUserAction implements Action {
  public readonly type = ActionTypes.DO_LOAD_USER;

  constructor(public payload: Token) {}
}

export class DoLoadUserSuccessAction implements Action {
  public readonly type = ActionTypes.DO_LOAD_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class DoLoadUserFailAction implements Action {
  public readonly type = ActionTypes.DO_LOAD_USER_FAIL;

  constructor(public payload: any = null) {}
}

/**
 * Register Actions
 */
export class DoRegisterAction implements Action {
  public readonly type = ActionTypes.DO_REGISTER;

  constructor(public payload: RegistrationRequest) {}
}

export class DoRegisterSuccessAction implements Action {
  public readonly type = ActionTypes.DO_REGISTER_SUCCESS;

  constructor(public payload: any = null) {}
}

export class DoRegisterFailAction implements Action {
  public readonly type = ActionTypes.DO_REGISTER_FAIL;

  constructor(public payload: any = null) {}
}

export class DoUnloadRegisterAction implements Action {
  public readonly type = ActionTypes.DO_UNLOAD_REGISTER;

  constructor(public payload: any = null) {}
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
  | DoLoadUserAction
  | DoLoadUserSuccessAction
  | DoLoadUserFailAction
  | DoRegisterAction
  | DoRegisterSuccessAction
  | DoRegisterFailAction
  | DoUnloadRegisterAction
  | DoLogoutAction
  | DoLogoutSuccessAction
  | DoLogoutFailAction;



