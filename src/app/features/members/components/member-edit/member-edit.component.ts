import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User} from "@core/models/user.model";
import {IEditableComponent} from "@shared/components/editable.component";
import {BaseSandboxComponent} from "@shared/components/base-sandbox.component";
import {MemberEditSandbox} from "@members/sandbox/member-edit.sandbox";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditComponent extends BaseSandboxComponent<MemberEditSandbox> implements OnInit, OnDestroy, IEditableComponent {

  private _user: User;

  @ViewChild("editForm") form: NgForm;

  constructor(private _activatedRoute: ActivatedRoute,
              private _changeDetector: ChangeDetectorRef,
              memberEditSandbox: MemberEditSandbox) {
    super(memberEditSandbox);
  }

  get user(): User {
    return this._user;
  }

  public ngOnInit() {
    super.ngOnInit();

    const routeSubscription = this._activatedRoute.data.subscribe(data => {
      this._user = data["user"];
      this._changeDetector.markForCheck();
    });

    const memberEditUpdatedSubscription = this.sandbox.memberEditUpdated$.subscribe(updated => {
      if (updated) {
        this.form.reset(this._user);
        this._changeDetector.markForCheck();
      }
    });

    this._subscriptions.push(routeSubscription);
    this._subscriptions.push(memberEditUpdatedSubscription);
  }

  public ngOnDestroy() {
    this.sandbox.unloadMember();

    super.ngOnDestroy();
  }

  public updateUser() {
    if (this.form.valid) this.sandbox.updateMember(this._user);
  }
}
