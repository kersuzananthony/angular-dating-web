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
  updateErrorMessage: null
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


