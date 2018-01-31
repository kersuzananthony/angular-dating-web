import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import * as membersActions from "@core/store/actions/members.action";
import * as store from "@core/store";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {UserQuery} from "@core/models/queries/user-query.model";
import {isNullOrUndefined} from "util";

@Injectable()
export class MembersSandbox extends BaseSandbox {

  private static readonly LOAD_FAILED_KEY = "load_failed";

  public membersData$     = this._appState$.select(store.getMembersData);
  public membersLoaded$   = this._appState$.select(store.getMembersLoaded);
  public membersFailed$   = this._appState$.select(store.getMembersFailed);
  public membersQuery$    = this._appState$.select(store.getMembersQuery);
  public membersLoading$  = this._appState$.select(store.getMembersLoading);
  public membersDefaultGenders$ = this._appState$.select(store.getMembersDefaultGenders);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(MembersSandbox.LOAD_FAILED_KEY, this._loadFailedSubscription.bind(this));
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

  private _loadFailedSubscription(): Subscription {
    return this.membersFailed$.subscribe(failed => {
      if (failed) this.messageService.error("Cannot fetch users from the server");
    });
  }
}
