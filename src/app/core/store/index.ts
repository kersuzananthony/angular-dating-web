import * as fromAuth from "./reducers/auth.reducer";
import * as fromMembers from "./reducers/members.reducer";
import * as fromMemberDetail from "./reducers/member-detail.reducer";
import * as fromMemberEdit from "./reducers/member-edit.reducer";

import {createSelector} from "reselect";
import {ActionReducerMap} from "@ngrx/store";

export interface State {
  auth: fromAuth.State;
  members: fromMembers.State;
  memberDetail: fromMemberDetail.State;
  memberEdit: fromMemberEdit.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  members: fromMembers.reducer,
  memberDetail: fromMemberDetail.reducer,
  memberEdit: fromMemberEdit.reducer
};

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 */

/**
 * Auth Store Functions
 */
export const getAuthState   = (state: State) => state.auth;
export const getAuthToken   = createSelector(getAuthState, fromAuth.getToken);
export const getAuthLoading = createSelector(getAuthState, fromAuth.getLoading);
export const getAuthLoaded  = createSelector(getAuthState, fromAuth.getLoaded);
export const getAuthFailed  = createSelector(getAuthState, fromAuth.getFailed);

/**
 * Members store functions
 */
export const getMembersState    = (state: State) => state.members;
export const getMembersData     = createSelector(getMembersState, fromMembers.getData);
export const getMembersLoading  = createSelector(getMembersState, fromMembers.getLoading);
export const getMembersLoaded   = createSelector(getMembersState, fromMembers.getLoaded);
export const getMembersFailed   = createSelector(getMembersState, fromMembers.getFailed);

/**
 * MemberDetail store functions
 */
export const getMemberDetailState   = (state: State) => state.memberDetail;
export const getMembersDetailData   = createSelector(getMemberDetailState, fromMemberDetail.getData);
export const getMemberDetailLoading = createSelector(getMemberDetailState, fromMemberDetail.getLoading);
export const getMemberDetailLoaded  = createSelector(getMemberDetailState, fromMemberDetail.getLoaded);
export const getMemberDetailFailed  = createSelector(getMemberDetailState, fromMemberDetail.getFailed);

/**
 * MemberEdit store functions
 */
export const getMemberEditState         = (state: State) => state.memberEdit;
export const getMemberEditData          = createSelector(getMemberEditState, fromMemberEdit.getData);
export const getMemberEditLoading       = createSelector(getMemberEditState, fromMemberEdit.getLoading);
export const getMemberEditLoaded        = createSelector(getMemberEditState, fromMemberEdit.getLoaded);
export const getMemberEditFailed        = createSelector(getMemberEditState, fromMemberEdit.getFailed);
export const getMemberEditUpdating      = createSelector(getMemberEditState, fromMemberEdit.getUpdating);
export const getMemberEditUpdated       = createSelector(getMemberEditState, fromMemberEdit.getUpdated);
export const getMemberEditUpdateFail    = createSelector(getMemberEditState, fromMemberEdit.getUpdateFailed);
export const getMemberEditErrorMessage  = createSelector(getMemberEditState, fromMemberEdit.getUpdateErrorMessage);
export const getMemberEditErrorState    = createSelector(getMemberEditState, fromMemberEdit.getUpdateErrorState);


