import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import * as store from "@core/store";
import * as memberEditActions from "@core/store/actions/member-edit.action";
import {Store} from "@ngrx/store";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/Subscription";
import {User} from "@app/core/models/user.model";

@Injectable()
export class MemberEditSandbox extends BaseSandbox {

  private static readonly LOAD_FAILED_KEY = "load_failed";
  private static readonly UPDATE_FAILED_KEY = "update_failed";
  private static readonly UPDATE_SUCCESS_KEY = "update_success";

  public memberEditFailed$      = this._appState$.select(store.getMemberEditFailed);
  public memberEditLoaded$      = this._appState$.select(store.getMemberEditLoaded);
  public memberEditData$        = this._appState$.select(store.getMemberEditData);
  public memberEditUpdateFail$  = this._appState$.select(store.getMemberEditUpdateFail);
  public memberEditUpdated$     = this._appState$.select(store.getMemberEditUpdated);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    if (!this._subscriptions.has(MemberEditSandbox.LOAD_FAILED_KEY)) {
      this._subscriptions.set(MemberEditSandbox.LOAD_FAILED_KEY, this._loadFailSubscription());
    }

    if (!this._subscriptions.has(MemberEditSandbox.UPDATE_FAILED_KEY)) {
      this._subscriptions.set(MemberEditSandbox.UPDATE_FAILED_KEY, this._updateFailSubscription());
    }

    if (!this._subscriptions.has(MemberEditSandbox.UPDATE_SUCCESS_KEY)) {
      this._subscriptions.set(MemberEditSandbox.UPDATE_SUCCESS_KEY, this._updateSuccessSubscription());
    }
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

  public unloadMember() {
    this._appState$.dispatch(new memberEditActions.DoUnloadAction());
  }

  public updateMember(model: User) {
    this._appState$.dispatch(new memberEditActions.DoUpdateAction(model));
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
}
