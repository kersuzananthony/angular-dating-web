import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import * as membersActions from "@core/store/actions/members.action";
import * as store from "@core/store";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {UserQuery} from "@core/models/queries/user-query.model";
import {isNullOrUndefined} from "util";
import "rxjs/add/operator/withLatestFrom";
import {User} from "@core/models/user.model";

@Injectable()
export class MembersSandbox extends BaseSandbox {

  private static readonly LOAD_FAILED_KEY = "load_failed";
  private static readonly LIKE_USER_SUCCESS = "like_user_success";
  private static readonly LIKE_USER_FAIL = "like_user_fail";

  public membersData$           = this._appState$.select(store.getMembersData);
  public membersLoaded$         = this._appState$.select(store.getMembersLoaded);
  public membersFailed$         = this._appState$.select(store.getMembersFailed);
  public membersQuery$          = this._appState$.select(store.getMembersQuery);
  public membersLoading$        = this._appState$.select(store.getMembersLoading);
  public membersDefaultGenders$ = this._appState$.select(store.getMembersDefaultGenders);
  public membersLikeUser$       = this._appState$.select(store.getMembersLikeUser);
  public membersLikeFail$       = this._appState$.select(store.getMembersLikeFail);
  public membersLikeSuccess$    = this._appState$.select(store.getMembersLikeSuccess);
  public membersLikeErrorMessage$  = this._appState$.select(store.getMembersLikeErrorMessage);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(MembersSandbox.LOAD_FAILED_KEY, this._loadFailedSubscription.bind(this));
    this._registerEvent(MembersSandbox.LIKE_USER_SUCCESS, this._likeUserSuccess.bind(this));
    this._registerEvent(MembersSandbox.LIKE_USER_FAIL, this._likeUserFail.bind(this));
  }

  public doLoadQuery(): void {
    this._appState$.dispatch(new membersActions.DoLoadQueryAction());
  }

  public doUnloadQuery(): void {
    this._appState$.dispatch(new membersActions.DoUnloadQueryAction());
  }

  public updateQuery(query: UserQuery): void {
    if (isNullOrUndefined(query)) return;

    this._appState$.dispatch(new membersActions.DoUpdateQueryAction(query));
  }

  public resetFilter(): void {
    this._appState$.dispatch(new membersActions.DoResetFiltersAction());
  }

  public likeUser(user: User): void {
    if (isNullOrUndefined(user)) {
      this._appState$.dispatch(new membersActions.DoLikeFailAction("User is not defined"));
      return;
    }

    this._appState$.dispatch(new membersActions.DoLikeAction(user));
  }

  private _loadFailedSubscription(): Subscription {
    return this.membersFailed$.subscribe(failed => {
      if (failed) this.messageService.error("Cannot fetch users from the server");
    });
  }

  private _likeUserFail(): Subscription {
    return this.membersLikeFail$.withLatestFrom(this.membersLikeErrorMessage$, (fail, errorMessage) => {
      return {fail, errorMessage};
    }).subscribe(data => {
      if (data.fail) this.messageService.error(data.errorMessage || "An error occurred.");
    });
  }

  private _likeUserSuccess(): Subscription {
    return this.membersLikeSuccess$.withLatestFrom(this.membersLikeUser$, (success, user) => {
      return {success, user};
    }).subscribe(data => {
      if (data.success && data.user) {
        this.messageService.success(`You liked ${data.user.username || "this person."}`);
      }
    });
  }
}
