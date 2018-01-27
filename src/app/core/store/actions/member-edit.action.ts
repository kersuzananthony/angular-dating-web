import {Action} from "@ngrx/store";
import {User} from "@core/models/user.model";
import {Photo} from "@core/models/photo.model";

export const ActionTypes = {
  DO_LOAD:                    "[MemberEdit] doLoad",
  DO_LOAD_SUCCESS:            "[MemberEdit] doLoadSuccess",
  DO_LOAD_FAIL:               "[MemberEdit] doLoadFail",
  DO_UNLOAD:                  "[MemberEdit] doUnload",

  DO_UPDATE:                  "[MemberEdit] doUpdate",
  DO_UPDATE_SUCCESS:          "[MemberEdit] doUpdateSuccess",
  DO_UPDATE_FAIL:             "[MemberEdit] doUpdateFail",

  DO_UPLOAD_PHOTO_SUCCESS:    "[MemberEdit] doUploadPhotoSuccess",

  DO_SET_PHOTO_MAIN:          "[MemberEdit] doSetPhotoMain",
  DO_SET_PHOTO_MAIN_SUCCESS:  "[MemberEdit] doSetPhotoMainSuccess",
  DO_SET_PHOTO_MAIN_ERROR:    "[MemberEdit] doSetPhotoMainError",

  DO_DELETE_PHOTO:            "[MemberEdit] doDeletePhoto",
  DO_DELETE_PHOTO_SUCCESS:    "[MemberEdit] doDeletePhotoSuccess",
  DO_DELETE_PHOTO_FAIL:       "[MemberEdit] doDeletePhotoFail"
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

/**
 * Member upload photo
 */
export class DoUploadPhotoSuccessAction implements Action {

  public readonly type = ActionTypes.DO_UPLOAD_PHOTO_SUCCESS;

  constructor(public payload: Photo) {}
}

/**
 * Member edit set main photo
 */
export class DoSetMainPhotoAction implements Action {

  public readonly type = ActionTypes.DO_SET_PHOTO_MAIN;

  constructor(public payload: Photo) {}
}

export class DoSetMainPhotoSuccessAction implements Action {

  public readonly type = ActionTypes.DO_SET_PHOTO_MAIN_SUCCESS;

  constructor(public payload: Photo) {}
}

export class DoSetMainPhotoErrorAction implements Action {

  public readonly type = ActionTypes.DO_SET_PHOTO_MAIN_ERROR;

  constructor(public payload: any = null) {}
}

/**
 * Delete photo actions
 */
export class DoDeletePhotoAction implements Action {

  public readonly type = ActionTypes.DO_DELETE_PHOTO;

  constructor(public payload: Photo) {}
}

export class DoDeletePhotoSuccessAction implements Action {

  public readonly type = ActionTypes.DO_DELETE_PHOTO_SUCCESS;

  constructor(public payload: Photo) {}
}

export class DoDeletePhotoFailAction implements Action {

  public readonly type = ActionTypes.DO_DELETE_PHOTO_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions
  = DoLoadAction
  | DoLoadSuccessAction
  | DoLoadFailAction
  | DoUnloadAction
  | DoUpdateAction
  | DoUpdateSuccessAction
  | DoUpdateFailAction
  | DoUploadPhotoSuccessAction
  | DoSetMainPhotoAction
  | DoSetMainPhotoSuccessAction
  | DoSetMainPhotoErrorAction
  | DoDeletePhotoAction
  | DoDeletePhotoSuccessAction
  | DoDeletePhotoFailAction;



