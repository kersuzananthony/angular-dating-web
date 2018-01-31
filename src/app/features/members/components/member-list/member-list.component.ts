import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "@core/models/user.model";
import {BaseSandboxComponent} from "@shared/components/base-sandbox.component";
import {MembersSandbox} from "@members/sandbox/members.sandbox";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/takeUntil";
import {UserQuery} from "@core/models/queries/user-query.model";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent extends BaseSandboxComponent<MembersSandbox> implements OnInit, OnDestroy {

  private static readonly ITEMS_PER_PAGE = 20;

  private _users: User[];
  get users(): User[] {
    return this._users;
  }

  private _userQuery: UserQuery;
  get userQuery(): UserQuery {
    return this._userQuery;
  }

  public page = 1;

  get itemsPerPage(): number {
    return MemberListComponent.ITEMS_PER_PAGE;
  }

  private _totalItems: number;
  get totalItems(): number {
    return this._totalItems;
  }

  constructor(private _changeDetector: ChangeDetectorRef,
              membersSandbox: MembersSandbox) {
    super(membersSandbox);
  }

  public ngOnInit() {
    super.ngOnInit();

    Observable.combineLatest(this.sandbox.membersData$, this.sandbox.membersLoaded$, this.sandbox.membersFailed$)
      .takeUntil(this.destroyed$)
      .filter(([data, loaded, failed]) => {
        return (loaded && !isNullOrUndefined(data) || failed);
      })
      .subscribe(([data, loaded, failed]) => {
        this._totalItems = (data && data.totalItems) || 0;
        this._users = (data && data.results) || [];
        this._stateChanged();
      });

    this.sandbox.membersQuery$.takeUntil(this.destroyed$).subscribe(userQuery => {
      this._userQuery = userQuery;
      this._stateChanged();
    });
  }

  public ngOnDestroy() {
    this.sandbox.doUnloadQuery();

    super.ngOnDestroy();
  }

  public onPageChanged(event: any) {
    if (isNullOrUndefined(event)) return;

    this.sandbox.updateQuery({
      page: event.page,
      pageSize: event.itemsPerPage
    });
  }

  public resetFilter() {
    this.sandbox.resetFilter();
  }

  public applyFilter() {
    this.sandbox.updateQuery({...this._userQuery});
  }

  private _stateChanged() {
    this._changeDetector.markForCheck();
  }
}
