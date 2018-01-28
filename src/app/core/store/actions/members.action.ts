import {type} from "@shared/helpers";
import {Action} from "@ngrx/store";
import {User} from "@core/models/user.model";
import {QueryResponse} from "@core/models/responses/query-response.model";
import {UserQuery} from "@core/models/queries/user-query.model";

export const ActionTypes = {
  DO_FETCH:         type("[Members] DoFetch"),
  DO_FETCH_SUCCESS: type("[Members] DoFetchSuccess"),
  DO_FETCH_FAIL:    type("[Members] DoFetchFail"),

  DO_UPDATE_QUERY:  type("[Members] DoUpdateQuery")
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

export class DoUpdateQuery implements Action {

  public readonly type = ActionTypes.DO_UPDATE_QUERY;

  constructor(public payload: UserQuery) {}
}

export type Actions
  = DoFetchAction
  | DoFetchActionSuccess
  | DoFetchActionFail
  | DoUpdateQuery;


