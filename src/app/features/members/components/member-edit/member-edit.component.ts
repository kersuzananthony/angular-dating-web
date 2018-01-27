import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User} from "@core/models/user.model";
import {IEditableComponent} from "@shared/components/editable.component";
import {BaseSandboxComponent} from "@shared/components/base-sandbox.component";
import {MemberEditSandbox} from "@members/sandbox/member-edit.sandbox";
import {Photo} from "@app/core/models/photo.model";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.scss"]
})
export class MemberEditComponent extends BaseSandboxComponent<MemberEditSandbox> implements OnInit, OnDestroy, IEditableComponent {

  get user(): User { return this._user; }
  private _user: User;

  @ViewChild("editForm") form: NgForm;

  constructor(private _activatedRoute: ActivatedRoute,
              memberEditSandbox: MemberEditSandbox) {
    super(memberEditSandbox);
  }

  public ngOnInit() {
    super.ngOnInit();

    const userSubscription = this.sandbox.memberEditData$.subscribe(user => {
      this._user = user;
    });

    const memberEditUpdatedSubscription = this.sandbox.memberEditUpdated$.subscribe(updated => {
      if (updated) {
        this.form.reset(this._user);
      }
    });

    this._subscriptions.push(userSubscription);
    this._subscriptions.push(memberEditUpdatedSubscription);
  }

  public ngOnDestroy() {
    this.sandbox.unloadMember();

    super.ngOnDestroy();
  }

  public updateUser() {
    if (this.form.valid) this.sandbox.updateMember(this._user);
  }

  public onUpdateMainPhoto(photo: Photo) {
    this.sandbox.setMainPhoto(photo);
  }

  public onDeletePhoto(photo: Photo) {
    this._messageService.confirm("Are you sure you want to delete this picture?", () => this.sandbox.deletePhoto(photo));
  }
}

