import {type} from "@shared/helpers";
import {Action} from "@ngrx/store";
import {User} from "@core/models/user.model";

export const ActionTypes = {
  DO_FETCH:         type("[MemberDetail] DoFetch"),
  DO_FETCH_SUCCESS: type("[MemberDetail] DoFetchSuccess"),
  DO_FETCH_FAIL:    type("[MemberDetail] DoFetchFail"),
  DO_UNLOAD:        type("[MemberDetail] DoUnload"),
  DO_LIKE:          type("[MemberDetail] DoLike"),
  DO_LIKE_SUCCESS:  type("[MemberDetail] DoLikeSuccess"),
  DO_LIKE_FAIL:     type("[MemberDetail] DoLikeFail")
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

export class DoLikeAction implements Action {
  public readonly type = ActionTypes.DO_LIKE;

  constructor(public payload: any = null) {}
}

export class DoLikeSuccessAction implements Action {
  public readonly type = ActionTypes.DO_LIKE_SUCCESS;

  constructor(public payload: any = null) {}
}

export class DoLikeFailAction implements Action {
  public readonly type = ActionTypes.DO_LIKE_FAIL;

  constructor(public payload: string) {}
}

export class DoUnloadAction implements Action {
  public readonly type = ActionTypes.DO_UNLOAD;

  constructor(public payload: any = null) {}
}

export type Actions
  = DoFetchAction
  | DoFetchSuccessAction
  | DoFetchFailAction
  | DoLikeAction
  | DoLikeSuccessAction
  | DoLikeFailAction
  | DoUnloadAction;

