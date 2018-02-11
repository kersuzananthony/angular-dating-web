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
  defaults: {gender: {label: string, key: string}[]};
  like: {
    user: User,
    errorMessage: string,
    success: boolean,
    failed: boolean
  };
}

export const INITIAL_FILTER: UserQuery = {
  minAge: 18,
  maxAge: 99,
  sortBy: "active"
};

export const INITIAL_LIKE = {
  user: null,
  errorMessage: null,
  success: false,
  failed: false
};

export const INITIAL_USER_QUERY: UserQuery = {
  page: 1,
  pageSize: 20,
  ...INITIAL_FILTER
};

const INITIAL_STATE: State = {
  loading:    false,
  loaded:     false,
  failed:     false,
  data:       null,
  query:      {page: 1},
  defaults: {
    gender: [
      {label: "Males", key: "male"},
      {label: "Females", key: "female"}
    ]
  },
  like: {
    ...INITIAL_LIKE
  }
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

    case membersActions.ActionTypes.DO_UNLOAD_QUERY:
      return { ...state, query: { ...INITIAL_USER_QUERY }, like: { ...INITIAL_LIKE }};

    case membersActions.ActionTypes.DO_LIKE:
      return { ...state, like: { errorMessage: null, failed: false, success: false, user: action.payload } };

    case membersActions.ActionTypes.DO_LIKE_SUCCESS:
      return { ...state, like: { ...state.like, errorMessage: null, failed: false, success: true }};

    case membersActions.ActionTypes.DO_LIKE_FAIL:
      return { ...state, like: { errorMessage: action.payload, failed: true, success: false, user: null }};

    default:
      return { ...state };
  }
}

export const getData            = (state: State) => state.data;
export const getLoading         = (state: State) => state.loading;
export const getLoaded          = (state: State) => state.loaded;
export const getFailed          = (state: State) => state.failed;
export const getQuery           = (state: State) => state.query;
export const getDefaultsGender  = (state: State) => state.defaults.gender;
export const getLikeUser        = (state: State) => state.like.user;
export const getLikeSuccess     = (state: State) => state.like.success;
export const getLikeFail        = (state: State) => state.like.failed;
export const getLikeErrorMessage = (state: State) => state.like.errorMessage;



