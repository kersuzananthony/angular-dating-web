import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import * as membersActions from "@core/store/actions/members.action";
import * as store from "@core/store";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class MembersSandbox extends BaseSandbox {

  private static readonly LOAD_FAILED_KEY = "load_failed";

  public membersData$   = this._appState$.select(store.getMembersData);
  public membersLoaded$ = this._appState$.select(store.getMembersLoaded);
  public membersFailed$ = this._appState$.select(store.getMembersFailed);
  public membersLoading$ = this._appState$.select(store.getMembersLoading);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(MembersSandbox.LOAD_FAILED_KEY, this._loadFailedSubscription.bind(this));
  }

  public loadUsers(): void {
    this._appState$.dispatch(new membersActions.DoFetchAction());
  }

  private _loadFailedSubscription(): Subscription {
    return this.membersFailed$.subscribe(failed => {
      if (failed) this.messageService.error("Cannot fetch users from the server");
    });
  }
}
