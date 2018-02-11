import {User} from "@core/models/user.model";
import * as memberDetailAction from "../actions/member-detail.action";
import {isNullOrUndefined} from "util";
import {transformUserPhotoUrl} from "@core/helpers";

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: User;
  like: {
    loading: boolean,
    success: boolean,
    failed: boolean,
    errorMessage: string
  };
}

const INITIAL_STATE: State = {
  loading:    false,
  loaded:     false,
  failed:     false,
  data:       null,
  like: {
    loading: false,
    success: false,
    failed: false,
    errorMessage: null
  }
};

export function reducer(state = INITIAL_STATE, action: memberDetailAction.Actions): State {
  if (isNullOrUndefined(action)) return { ...state };

  switch (action.type) {
    case memberDetailAction.ActionTypes.DO_FETCH:
      return { ...INITIAL_STATE, loading: true };

    case memberDetailAction.ActionTypes.DO_FETCH_SUCCESS:
      return { ...state, data: transformUserPhotoUrl(action.payload), failed: false, loading: false, loaded: true };

    case memberDetailAction.ActionTypes.DO_FETCH_FAIL:
      return { ...state, data: null, loaded: false, loading: false, failed: true };

    case memberDetailAction.ActionTypes.DO_UNLOAD:
      return { ...INITIAL_STATE };

    case memberDetailAction.ActionTypes.DO_LIKE:
      return { ...state, like: { loading: true, success: false, errorMessage: null, failed: false }};

    case memberDetailAction.ActionTypes.DO_LIKE_SUCCESS:
      return { ...state, like: { loading: false, success: true, errorMessage: null, failed: false }};

    case memberDetailAction.ActionTypes.DO_LIKE_FAIL:
      return { ...state, like: { loading: false, success: false, errorMessage: action.payload, failed: true }};

    default:
      return { ...state };
  }
}

export const getData    = (state: State) => state.data;
export const getLoading = (state: State) => state.loading;
export const getLoaded  = (state: State) => state.loaded;
export const getFailed  = (state: State) => state.failed;
export const getLikeLoading = (state: State) => state.like.loading;
export const getLikeSuccess = (state: State) => state.like.success;
export const getLikeFail    = (state: State) => state.like.failed;
export const getLikeErrorMessage = (state: State) => state.like.errorMessage;

