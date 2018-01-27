import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import * as store from "@core/store";
import * as memberEditActions from "@core/store/actions/member-edit.action";
import {Store} from "@ngrx/store";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/Subscription";
import {User} from "@app/core/models/user.model";
import {Photo} from "@core/models/photo.model";
import {ApplicationEventBus} from "@core/event-bus/application-event-bus.service";
import "rxjs/add/operator/take";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MemberEditSandbox extends BaseSandbox {

  private static readonly LOAD_FAILED_KEY = "load_failed";
  private static readonly UPDATE_FAILED_KEY = "update_failed";
  private static readonly UPDATE_SUCCESS_KEY = "update_success";
  private static readonly SET_MAIN_PHOTO_ERROR = "set_main_photo_error";
  private static readonly SET_MAIN_PHOTO_SUCCESS = "set_main_photo_success";
  private static readonly DELETING_PHOTO_SUCCESS = "deleting_photo_success";
  private static readonly DELETING_PHOTO_FAIL = "deleting_photo_fail";

  public userToken$             = this._appState$.select(store.getAuthToken);
  public memberEditFailed$      = this._appState$.select(store.getMemberEditFailed);
  public memberEditLoaded$      = this._appState$.select(store.getMemberEditLoaded);
  public memberEditData$        = this._appState$.select(store.getMemberEditData);
  public memberEditUpdateFail$  = this._appState$.select(store.getMemberEditUpdateFail);
  public memberEditUpdated$     = this._appState$.select(store.getMemberEditUpdated);
  public memberEditSettingMainPhotoError$   = this._appState$.select(store.getMemberEditSettingMainPhotoError);
  public memberEditSettingMainPhotoSuccess$ = this._appState$.select(store.getMemberEditSettingMainPhotoSuccess);
  public memberEditDeletingPhotoSuccess$    = this._appState$.select(store.getMemberEditDeletingPhotoSuccess);
  public memberEditDeletingPhotoFail$       = this._appState$.select(store.getMemberEditDeletingPhotoFail);

  constructor(protected _applicationEventBus: ApplicationEventBus,
              protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(MemberEditSandbox.LOAD_FAILED_KEY, this._loadFailSubscription.bind(this));
    this._registerEvent(MemberEditSandbox.UPDATE_FAILED_KEY, this._updateFailSubscription.bind(this));
    this._registerEvent(MemberEditSandbox.UPDATE_SUCCESS_KEY, this._updateSuccessSubscription.bind(this));
    this._registerEvent(MemberEditSandbox.SET_MAIN_PHOTO_ERROR, this._setMainPhotoErrorSubscription.bind(this));
    this._registerEvent(MemberEditSandbox.SET_MAIN_PHOTO_SUCCESS, this._setMainPhotoSuccessSubscription.bind(this));
    this._registerEvent(MemberEditSandbox.DELETING_PHOTO_SUCCESS, this._deletingPhotoSuccessSubscription.bind(this));
    this._registerEvent(MemberEditSandbox.DELETING_PHOTO_FAIL, this._deletingPhotoFailSubscription.bind(this));
  }

  public loadMember() {
    this._appState$.select(store.getAuthToken).take(1).subscribe(token => {
      if (isNullOrUndefined(token) || isNullOrUndefined(token.decodedToken.nameid)) {
        this._appState$.dispatch(new memberEditActions.DoLoadFailAction());
        return;
      }

      this._appState$.dispatch(new memberEditActions.DoLoadAction(+token.decodedToken.nameid));
    });
  }

  public photoUploadError() {
    this.messageService.error("Error during upload.");
  }

  public photoUploadSuccess(item, response) {
    const photo: Photo = JSON.parse(response);
    if (!isNullOrUndefined(photo)) this._appState$.dispatch(new memberEditActions.DoUploadPhotoSuccessAction(photo));
  }

  public setMainPhoto(photo: Photo) {
    this._appState$.dispatch(new memberEditActions.DoSetMainPhotoAction(photo));
  }

  public unloadMember() {
    this._appState$.dispatch(new memberEditActions.DoUnloadAction());
  }

  public updateMember(model: User) {
    this._appState$.dispatch(new memberEditActions.DoUpdateAction(model));
  }

  public deletePhoto(photo: Photo) {
    this._appState$.dispatch(new memberEditActions.DoDeletePhotoAction(photo));
  }

  private _loadFailSubscription(): Subscription {
    return this.memberEditFailed$.subscribe(failed => {
      if (failed) {
        this.messageService.error("An error occurred when getting the user.");
        this._router.navigate(["/members"]);
        this.unloadMember();
      }
    });
  }

  private _updateFailSubscription(): Subscription {
    return this.memberEditUpdateFail$.subscribe(failed => {

    });
  }

  private _updateSuccessSubscription(): Subscription {
    return this.memberEditUpdated$.subscribe(updated => {
      if (updated) this.messageService.success("Your profile has been successfully updated!");
    });
  }

  private _setMainPhotoErrorSubscription(): Subscription {
    return this.memberEditSettingMainPhotoError$.subscribe(error => {
      if (error) this.messageService.error("Cannot update main photo. Retry later.");
    });
  }

  private _setMainPhotoSuccessSubscription(): Subscription {
    return this.memberEditSettingMainPhotoSuccess$.subscribe(success => {
      if (success) {
        this.messageService.success("Successfully updated your main photo.");
        this.memberEditData$.take(1).subscribe(user => this._applicationEventBus.updateUser(user));
      }
    });
  }

  private _deletingPhotoSuccessSubscription(): Subscription {
    return this.memberEditDeletingPhotoSuccess$.subscribe(success => {
      if (success) this.messageService.success("Successfully deleting your photo.");
    });
  }

  private _deletingPhotoFailSubscription(): Subscription {
    return this.memberEditDeletingPhotoFail$.subscribe(failed => {
      if (failed) this.messageService.error("Cannot delete your photo.");
    });
  }
}
