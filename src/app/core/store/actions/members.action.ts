import {type} from "@shared/helpers";
import {Action} from "@ngrx/store";
import {User} from "@core/models/user.model";

export const ActionTypes = {
  DO_FETCH:         type("[Members] DoFetch"),
  DO_FETCH_SUCCESS: type("[Members] DoFetchSuccess"),
  DO_FETCH_FAIL:    type("[Members] DoFetchFail")
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

  constructor(public payload: User[] = null) {}
}

export class DoFetchActionFail implements Action {

  public readonly type = ActionTypes.DO_FETCH_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions
  = DoFetchAction
  | DoFetchActionSuccess
  | DoFetchActionFail;

