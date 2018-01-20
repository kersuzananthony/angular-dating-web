import {User} from "@core/models/user.model";
import * as membersActions from "../actions/members.action";
import {isNullOrUndefined} from "util";

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: User[];
}

const INITIAL_STATE: State = {
  loading:    false,
  loaded:     false,
  failed:     false,
  data:       null
};

export function reducer(state = INITIAL_STATE, action: membersActions.Actions): State {
  if (isNullOrUndefined(action)) return { ...state };

  switch (action.type) {
    case membersActions.ActionTypes.DO_FETCH:
      return {...INITIAL_STATE, loading: true };

    case membersActions.ActionTypes.DO_FETCH_SUCCESS:
      return { ...state, loading: false, loaded: true, failed: false, data: action.payload };

    case membersActions.ActionTypes.DO_FETCH_FAIL:
      return { ...state, loading: false, loaded: false, failed: true, data: null };

    default:
      return { ...state };
  }
}

export const getData    = (state: State) => state.data;
export const getLoading = (state: State) => state.loading;
export const getLoaded  = (state: State) => state.loaded;
export const getFailed  = (state: State) => state.failed;

