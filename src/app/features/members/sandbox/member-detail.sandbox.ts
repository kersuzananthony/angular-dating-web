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

  public memberDetailFailed$  = this._appState$.select(store.getMemberDetailFailed);
  public memberDetailLoaded$  = this._appState$.select(store.getMemberDetailLoaded);
  public memberDetailData$    = this._appState$.select(store.getMembersDetailData);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(MemberDetailSandbox.LOAD_FAILED_KEY, this._loadFailedSubscription.bind(this));
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

  private _loadFailedSubscription(): Subscription {
    return this.memberDetailFailed$.subscribe(failed => {
      if (failed) {
        this.messageService.error("Cannot retrieve data.");
        this._router.navigate(["/members"]);
        this.unloadMemberDetail();
      }
    });
  }
}
