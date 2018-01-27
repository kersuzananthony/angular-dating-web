import {User} from "@core/models/user.model";
import * as actions from "../actions/member-edit.action";
import {isNullOrUndefined} from "util";
import {ModelStateError} from "@core/models/model-state-error.model";

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: User;

  updating: boolean;
  updated: boolean;
  updateFail: boolean;
  updateErrorState: ModelStateError;
  updateErrorMessage: string;

  settingMainPhotoError: boolean;
  settingsMainPhotoSuccess: boolean;

  deletingPhoto: boolean;
  deletingPhotoSuccess: boolean;
  deletingPhotoFail: boolean;
}

const INITIAL_STATE: State = {
  loading:            false,
  loaded:             false,
  failed:             false,
  data:               null,
  updating:           false,
  updated:            false,
  updateFail:         false,
  updateErrorState:   null,
  updateErrorMessage: null,
  settingMainPhotoError: false,
  settingsMainPhotoSuccess: false,
  deletingPhoto: false,
  deletingPhotoSuccess: false,
  deletingPhotoFail: false
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (isNullOrUndefined(action)) return { ...state };

  switch (action.type) {
    case actions.ActionTypes.DO_LOAD:
      return { ...state, loading: true, failed: false, loaded: false, data: null };

    case actions.ActionTypes.DO_LOAD_SUCCESS:
      return { ...state, loading: false, loaded: true, failed: false, data: action.payload };

    case actions.ActionTypes.DO_LOAD_FAIL:
      return { ...state, loading: false, loaded: false, failed: true, data: null };

    case actions.ActionTypes.DO_UNLOAD:
      return { ...INITIAL_STATE };

    case actions.ActionTypes.DO_UPDATE:
      return { ...state, updating: true, updateFail: false, updated: false, updateErrorMessage: null, updateErrorState: null };

    case actions.ActionTypes.DO_UPDATE_SUCCESS:
      return { ...state, updating: false, updated: true, updateErrorState: null, updateErrorMessage: null, updateFail: false };

    case actions.ActionTypes.DO_UPDATE_FAIL:
      if (action.payload instanceof ModelStateError) {
        return {
          ...state,
          updating: false,
          updated: false,
          updateFail: true,
          updateErrorState: <ModelStateError>action.payload
        };
      } else {
        return {
          ...state,
          updating: false,
          updated: false,
          updateFail: true,
          updateErrorMessage: action.payload.message || action.payload
        };
      }

    case actions.ActionTypes.DO_UPLOAD_PHOTO_SUCCESS:
      if (!isNullOrUndefined(action.payload)) {
        return { ...state, data: { ...state.data, photos: [...state.data.photos, action.payload] }};
      } else {
        return { ...state };
      }

    case actions.ActionTypes.DO_SET_PHOTO_MAIN:
      return { ...state, settingMainPhotoError: false, settingsMainPhotoSuccess: false };

    case actions.ActionTypes.DO_SET_PHOTO_MAIN_ERROR:
      return { ...state, settingMainPhotoError: true, settingsMainPhotoSuccess: false };

    case actions.ActionTypes.DO_SET_PHOTO_MAIN_SUCCESS:
      if (isNullOrUndefined(state.data) || isNullOrUndefined(state.data.photos) || isNullOrUndefined(action.payload))
        return { ...state, settingsMainPhotoSuccess: true, settingMainPhotoError: false };

      const photos = [ ...state.data.photos ];
      photos.forEach(p => p.isMain = false);
      const main = photos.find(p => p.id === action.payload.id);
      main.isMain = true;

      if (isNullOrUndefined(main)) return { ...state, settingsMainPhotoSuccess: true, settingMainPhotoError: false };

      return {
        ...state,
        data: { ...state.data, photos: photos, photoUrl: main.url },
        settingsMainPhotoSuccess: true,
        settingMainPhotoError: false
      };

    case actions.ActionTypes.DO_DELETE_PHOTO:
      return { ...state, deletingPhoto: true, deletingPhotoFail: false, deletingPhotoSuccess: false };

    case actions.ActionTypes.DO_DELETE_PHOTO_SUCCESS:
      if (isNullOrUndefined(state.data) || isNullOrUndefined(state.data.photos) || isNullOrUndefined(action.payload))
        return { ...state, deletingPhoto: false, deletingPhotoSuccess: true, deletingPhotoFail: false };

      const _photoBeforeDelete = [ ...state.data.photos];
      const indexOfPhotoToDelete = _photoBeforeDelete.findIndex(p => p.id === action.payload.id);

      if (indexOfPhotoToDelete < 0)
        return { ...state, deletingPhoto: false, deletingPhotoSuccess: true, deletingPhotoFail: false };

      _photoBeforeDelete.splice(indexOfPhotoToDelete, 1);

      return {
        ...state,
        deletingPhoto: false,
        deletingPhotoSuccess: true,
        deletingPhotoFail: false,
        data: { ...state.data, photos: _photoBeforeDelete }
      };

    case actions.ActionTypes.DO_DELETE_PHOTO_FAIL:
      return { ...state, deletingPhoto: false, deletingPhotoSuccess: false, deletingPhotoFail: true };

    default:
      return { ...state };
  }
}

export const getData                = (state: State) => state.data;
export const getLoading             = (state: State) => state.loading;
export const getLoaded              = (state: State) => state.loaded;
export const getFailed              = (state: State) => state.failed;
export const getUpdating            = (state: State) => state.updating;
export const getUpdated             = (state: State) => state.updated;
export const getUpdateFailed        = (state: State) => state.updateFail;
export const getUpdateErrorMessage  = (state: State) => state.updateErrorMessage;
export const getUpdateErrorState    = (state: State) => state.updateErrorState;
export const getSettingMainPhotoError   = (state: State) => state.settingMainPhotoError;
export const getSettingMainPhotoSuccess = (state: State) => state.settingsMainPhotoSuccess;
export const getDeletingPhoto         = (state: State) => state.deletingPhoto;
export const getDeletingPhotoSuccess  = (state: State) => state.deletingPhotoSuccess;
export const getDeletingPhotoFail     = (state: State) => state.deletingPhotoFail;





