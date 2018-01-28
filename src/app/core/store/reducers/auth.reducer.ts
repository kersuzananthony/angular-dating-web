import * as actions from "../actions/auth.action";
import {isNullOrUndefined} from "util";
import {Token} from "../../models/token.model";
import {ModelStateError} from "@core/models/model-state-error.model";
import {User} from "@core/models/user.model";
import {transformUserPhotoUrl} from "@core/helpers";

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  token:  Token;
  user: User;
  registering: boolean;
  registered: boolean;
  registerFailed: boolean;
  errorMessage: string;
  errorState: ModelStateError;
}

const INITIAL_STATE: State = {
  loading:    false,
  loaded:     false,
  failed:     false,
  token:      null,
  user: null,
  registering: false,
  registered: false,
  registerFailed: false,
  errorMessage: null,
  errorState: null
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (isNullOrUndefined(action)) return { ...state };

  switch (action.type) {
    case actions.ActionTypes.DO_LOGIN:
      return { ...state, loading: true, loaded: false, failed: false, token: null, user: null };

    case actions.ActionTypes.DO_LOGIN_FAIL:
      return { ...INITIAL_STATE, failed: true, loading: false, token: null, user: null };

    case actions.ActionTypes.DO_LOGIN_SUCCESS:
      const payload = <{token: Token, user?: User}> action.payload;
      return { ...state, loading: false, loaded: true, failed: false, token: payload.token, user: payload.user };

    case actions.ActionTypes.DO_UNLOAD_LOGIN:
      return { ...state, loaded: false, failed: false, errorMessage: null, loading: false };

    case actions.ActionTypes.DO_LOAD_TOKEN:
      return { ...state };

    case actions.ActionTypes.DID_LOAD_TOKEN:
      return { ...state, token: action.payload };

    case actions.ActionTypes.DO_LOAD_USER:
      return { ...state, loading: true, loaded: false, failed: false };

    case actions.ActionTypes.DO_LOAD_USER_SUCCESS:
      return { ...state, loading: false, loaded: true, failed: false, user: transformUserPhotoUrl(action.payload) };

    case actions.ActionTypes.DO_LOAD_USER_FAIL:
      return { ...state, loading: false, loaded: false, failed: true, user: null, token: null };

    case actions.ActionTypes.DO_LOGOUT:
      return { ...INITIAL_STATE };

    case actions.ActionTypes.DO_REGISTER:
      return { ...state, registering: true, registered: false, registerFailed: false, errorMessage: null, errorState: null };

    case actions.ActionTypes.DO_REGISTER_SUCCESS:
      return { ...state, registerFailed: false, registered: true, registering: false, errorState: null, errorMessage: null };

    case actions.ActionTypes.DO_REGISTER_FAIL:
      const err = action.payload;
      if (err instanceof ModelStateError) {
        return { ...state, registerFailed: true, registering: false, registered: false, errorState: err };
      } else {
        return { ...state, registerFailed: true, registering: false, registered: false, errorMessage: err };
      }

    case actions.ActionTypes.DO_UNLOAD_REGISTER:
      return { ...state, registerFailed: false, registered: false, registering: false, errorState: null, errorMessage: null };

    default:
      return { ...state };
  }
}

export const getToken           = (state: State) => state.token;
export const getUser            = (state: State) => state.user;
export const getLoading         = (state: State) => state.loading;
export const getLoaded          = (state: State) => state.loaded;
export const getFailed          = (state: State) => state.failed;
export const getRegistering     = (state: State) => state.registering;
export const getRegistered      = (state: State) => state.registered;
export const getRegisterFailed  = (state: State) => state.registerFailed;
export const getErrorMessage    = (state: State) => state.errorMessage;
export const getErrorState      = (state: State) => state.errorState;

