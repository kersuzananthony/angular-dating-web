import {type} from "@shared/helpers";
import {Action} from "@ngrx/store";
import {User} from "@core/models/user.model";

export const ActionTypes = {
  DO_FETCH:         type("[MemberDetail] DoFetch"),
  DO_FETCH_SUCCESS: type("[MemberDetail] DoFetchSuccess"),
  DO_FETCH_FAIL:    type("[MemberDetail] DoFetchFail"),
  DO_UNLOAD:        type("[MemberDetail] DoUnload")
};

/**
 * MemberDetail actions
 */
export class DoFetchAction implements Action {

  public readonly type = ActionTypes.DO_FETCH;

  constructor(public payload: number) {}
}

export class DoFetchSuccessAction implements Action {

  public readonly type = ActionTypes.DO_FETCH_SUCCESS;

  constructor(public payload: User = null) {}
}

export class DoFetchFailAction implements Action {

  public readonly type = ActionTypes.DO_FETCH_FAIL;

  constructor(public payload: any = null) {}
}

export class DoUnloadAction implements Action {

  public readonly type = ActionTypes.DO_UNLOAD;

  constructor(public payload: any = null) {}
}

export type Actions
  = DoFetchAction
  | DoFetchSuccessAction
  | DoFetchFailAction
  | DoUnloadAction;

