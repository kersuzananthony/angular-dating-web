import * as actions from "../actions/auth.action";
import {isNullOrUndefined} from "util";
import {Token} from "../../models/token.model";
import {ModelStateError} from "@core/models/model-state-error.model";

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  token:  Token;
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
      return { ...state, loading: true, loaded: false, failed: false };

    case actions.ActionTypes.DO_LOGIN_FAIL:
      return { ...INITIAL_STATE, failed: true };

    case actions.ActionTypes.DO_LOGIN_SUCCESS:
      return { ...state, loading: false, loaded: true, failed: false, token: action.payload };

    case actions.ActionTypes.DO_LOAD_TOKEN:
      return { ...state };

    case actions.ActionTypes.DID_LOAD_TOKEN:
      return { ...state, token: action.payload };

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

    default:
      return { ...state };
  }
}

export const getToken           = (state: State) => state.token;
export const getLoading         = (state: State) => state.loading;
export const getLoaded          = (state: State) => state.loaded;
export const getFailed          = (state: State) => state.failed;
export const getRegistering     = (state: State) => state.registering;
export const getRegistered      = (state: State) => state.registered;
export const getRegisterFailed  = (state: State) => state.registerFailed;
export const getErrorMessage    = (state: State) => state.errorMessage;
export const getErrorState      = (state: State) => state.errorState;

