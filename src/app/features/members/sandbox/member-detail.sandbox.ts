import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import * as store from "@core/store";
import * as memberDetailAction from "@core/store/actions/member-detail.action";
import {Store} from "@ngrx/store";
import "rxjs/add/operator/take";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class MemberDetailSandbox extends BaseSandbox {

  private static readonly LOAD_FAILED_KEY = "load_failed";
  private static readonly LIKE_USER_SUCCESS = "like_user_success";
  private static readonly LIKE_USER_FAIL = "like_user_fail";

  public memberDetailFailed$  = this._appState$.select(store.getMemberDetailFailed);
  public memberDetailLoaded$  = this._appState$.select(store.getMemberDetailLoaded);
  public memberDetailData$    = this._appState$.select(store.getMembersDetailData);
  public memberDetailLikeLoading$ = this._appState$.select(store.getMemberDetailLikeLoading);
  public memberDetailLikeSuccess$ = this._appState$.select(store.getMemberDetailLikeSuccess);
  public memberDetailLikeFail$    = this._appState$.select(store.getMemberDetailLikeFail);
  public memberDetailLikeError$   = this._appState$.select(store.getMemberDetailLikeError);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(MemberDetailSandbox.LOAD_FAILED_KEY, this._loadFailedSubscription.bind(this));
    this._registerEvent(MemberDetailSandbox.LIKE_USER_FAIL, this._likeUserFail.bind(this));
    this._registerEvent(MemberDetailSandbox.LIKE_USER_SUCCESS, this._likeUserSuccess.bind(this));
  }

  public loadMemberDetail(id: number): void {
    this._appState$.dispatch(new memberDetailAction.DoFetchAction(id));
  }

  public unloadMemberDetail(): void {
    this._appState$.dispatch(new memberDetailAction.DoUnloadAction());
  }

  public throwError(): void {
    this._appState$.dispatch(new memberDetailAction.DoFetchFailAction());
  }

  public likeUser(): void {
    this._appState$.dispatch(new memberDetailAction.DoLikeAction());
  }

  private _loadFailedSubscription(): Subscription {
    return this.memberDetailFailed$.subscribe(failed => {
      if (failed) {
        this.messageService.error("Cannot retrieve data.");
        this._router.navigate(["/members"]);
        this.unloadMemberDetail();
      }
    });
  }

  private _likeUserFail(): Subscription {
    return this.memberDetailLikeFail$.withLatestFrom(this.memberDetailLikeError$, (fail, errorMessage) => {
      return {fail, errorMessage};
    }).subscribe(data => {
      if (data.fail) this.messageService.error(data.errorMessage || "An error occurred.");
    });
  }

  private _likeUserSuccess(): Subscription {
    return this.memberDetailLikeSuccess$.subscribe(success => {
      if (success) {
        this.messageService.success(`You liked this user!`);
      }
    });
  }
}
