import {User} from "@core/models/user.model";
import * as membersActions from "../actions/members.action";
import {isNullOrUndefined} from "util";
import {transformUserPhotoUrl} from "@core/helpers";
import {QueryResponse} from "@core/models/responses/query-response.model";
import {UserQuery} from "@core/models/queries/user-query.model";

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: QueryResponse<User>;
  query: UserQuery;
}

const INITIAL_STATE: State = {
  loading:    false,
  loaded:     false,
  failed:     false,
  data:       null,
  query:      {page: 1}
};

export function reducer(state = INITIAL_STATE, action: membersActions.Actions): State {
  if (isNullOrUndefined(action)) return { ...state };

  switch (action.type) {
    case membersActions.ActionTypes.DO_FETCH:
      return {...state, loading: true, loaded: false, failed: false, data: null };

    case membersActions.ActionTypes.DO_FETCH_SUCCESS:
      if (isNullOrUndefined(action.payload) || isNullOrUndefined(action.payload.results)) {
        return { ...state, loading: false, loaded: true, failed: false, data: action.payload };
      } else {
        const data = { ...action.payload, results: action.payload.results.map(m => transformUserPhotoUrl(m)) };
        return { ...state, loading: false, loaded: true, failed: false, data };
      }

    case membersActions.ActionTypes.DO_FETCH_FAIL:
      return { ...state, loading: false, loaded: false, failed: true, data: null };

    case membersActions.ActionTypes.DO_UPDATE_QUERY:
      const newQuery = isNullOrUndefined(state.query) ? { ...action.payload } : { ...state.query, ...action.payload };
      return { ...state, query: newQuery };

    default:
      return { ...state };
  }
}

export const getData    = (state: State) => state.data;
export const getLoading = (state: State) => state.loading;
export const getLoaded  = (state: State) => state.loaded;
export const getFailed  = (state: State) => state.failed;
export const getQuery   = (state: State) => state.query;

