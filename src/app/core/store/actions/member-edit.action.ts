import {Action} from "@ngrx/store";
import {User} from "@core/models/user.model";

export const ActionTypes = {
  DO_LOAD:            "[MemberEdit] doLoad",
  DO_LOAD_SUCCESS:    "[MemberEdit] doLoadSuccess",
  DO_LOAD_FAIL:       "[MemberEdit] doLoadFail",
  DO_UNLOAD:          "[MemberEdit] doUnload",

  DO_UPDATE:          "[MemberEdit] doUpdate",
  DO_UPDATE_SUCCESS:  "[MemberEdit] doUpdateSuccess",
  DO_UPDATE_FAIL:     "[MemberEdit] doUpdateFail",
};

/**
 * Member Edit Actions
 */
export class DoLoadAction implements Action {

  public readonly type = ActionTypes.DO_LOAD;

  constructor(public payload: number) {}
}

export class DoLoadSuccessAction implements Action {

  public readonly type = ActionTypes.DO_LOAD_SUCCESS;

  constructor(public payload: User) {}
}

export class DoLoadFailAction implements Action {

  public readonly type = ActionTypes.DO_LOAD_FAIL;

  constructor(public payload: any = null) {}
}

export class DoUnloadAction implements Action {

  public readonly type = ActionTypes.DO_UNLOAD;

  constructor(public payload: any = null) {}
}

/**
 * Member Edit update actions
 */
export class DoUpdateAction implements Action {

  public readonly type = ActionTypes.DO_UPDATE;

  constructor(public payload: User) {}
}

export class DoUpdateSuccessAction implements Action {

  public readonly type = ActionTypes.DO_UPDATE_SUCCESS;

  constructor(public payload: any = null) {}
}

export class DoUpdateFailAction implements Action {

  public readonly type = ActionTypes.DO_UPDATE_FAIL;

  constructor(public payload: any) {}
}

export type Actions
  = DoLoadAction
  | DoLoadSuccessAction
  | DoLoadFailAction
  | DoUnloadAction
  | DoUpdateAction
  | DoUpdateSuccessAction
  | DoUpdateFailAction;


