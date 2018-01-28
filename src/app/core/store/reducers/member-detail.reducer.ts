import {User} from "@core/models/user.model";
import * as memberDetailAction from "../actions/member-detail.action";
import {isNullOrUndefined} from "util";
import {transformUserPhotoUrl} from "@core/helpers";

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: User;
}

const INITIAL_STATE: State = {
  loading:    false,
  loaded:     false,
  failed:     false,
  data:       null
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

    default:
      return { ...state };
  }
}

export const getData    = (state: State) => state.data;
export const getLoading = (state: State) => state.loading;
export const getLoaded  = (state: State) => state.loaded;
export const getFailed  = (state: State) => state.failed;
