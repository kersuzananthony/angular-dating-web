import * as actions from "../actions/auth.action";
import {isNullOrUndefined} from "util";
import {Token} from "../../models/token.model";

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  token:  Token;
}

const INITIAL_STATE: State = {
  loading:    false,
  loaded:     false,
  failed:     false,
  token:      null
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

    default:
      return { ...state };
  }
}

export const getToken       = (state: State) => state.token;
export const getLoading     = (state: State) => state.loading;
export const getLoaded      = (state: State) => state.loaded;
export const getFailed      = (state: State) => state.failed;

