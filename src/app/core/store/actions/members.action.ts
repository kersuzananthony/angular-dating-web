import {type} from "@shared/helpers";
import {Action} from "@ngrx/store";
import {User} from "@core/models/user.model";
import {QueryResponse} from "@core/models/responses/query-response.model";
import {UserQuery} from "@core/models/queries/user-query.model";

export const ActionTypes = {
  DO_FETCH:         type("[Members] DoFetch"),
  DO_FETCH_SUCCESS: type("[Members] DoFetchSuccess"),
  DO_FETCH_FAIL:    type("[Members] DoFetchFail"),

  DO_LIKE:          type("[Members] DoLike"),
  DO_LIKE_SUCCESS:  type("[Members] DoLikeSuccess"),
  DO_LIKE_FAIL:     type("[Members] DoLikeFail"),

  DO_LOAD_QUERY:    type("[Members] DoLoadQuery"),
  DO_UPDATE_QUERY:  type("[Members] DoUpdateQuery"),
  DO_RESET_FILTERS: type("[Members] DoResetFilters"),
  DO_UNLOAD_QUERY:  type("[Members] DoUnloadQuery")
};

/**
 * Fetch members Actions
 */
export class DoFetchAction implements Action {
  public readonly type = ActionTypes.DO_FETCH;

  constructor(public payload: any = null) {}
}

export class DoFetchActionSuccess implements Action {
  public readonly type = ActionTypes.DO_FETCH_SUCCESS;

  constructor(public payload: QueryResponse<User> = null) {}
}

export class DoFetchActionFail implements Action {
  public readonly type = ActionTypes.DO_FETCH_FAIL;

  constructor(public payload: any = null) {}
}

/**
 * Like Actions
 */
export class DoLikeAction implements Action {
  public readonly type = ActionTypes.DO_LIKE;

  constructor(public payload: User) {}
}

export class DoLikeSuccessAction implements Action {
  public readonly type = ActionTypes.DO_LIKE_SUCCESS;

  constructor(public payload: any = null) {}
}

export class DoLikeFailAction implements Action {
  public readonly type = ActionTypes.DO_LIKE_FAIL;

  constructor(public payload: string = null) {}
}

/**
 * Query Actions
 */
export class DoLoadQueryAction implements Action {
  public readonly type = ActionTypes.DO_LOAD_QUERY;

  constructor(public payload: any = null) {}
}

export class DoUpdateQueryAction implements Action {
  public readonly type = ActionTypes.DO_UPDATE_QUERY;

  constructor(public payload: UserQuery) {}
}

export class DoResetFiltersAction implements Action {
  public readonly type = ActionTypes.DO_RESET_FILTERS;

  constructor(public payload: UserQuery = null) {}
}

export class DoUnloadQueryAction implements Action {
  public readonly type = ActionTypes.DO_UNLOAD_QUERY;

  constructor(public payload: any = null) {}
}

export type Actions
  = DoFetchAction
  | DoFetchActionSuccess
  | DoFetchActionFail
  | DoLikeAction
  | DoLikeSuccessAction
  | DoLikeFailAction
  | DoUpdateQueryAction
  | DoLoadQueryAction
  | DoResetFiltersAction
  | DoUnloadQueryAction;



