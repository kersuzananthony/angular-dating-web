import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {User} from "@core/models/user.model";
import {BaseSandboxComponent} from "@shared/components/base-sandbox.component";
import {MembersSandbox} from "@members/sandbox/members.sandbox";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent extends BaseSandboxComponent<MembersSandbox> implements OnInit {

  private _users: User[];

  constructor(private _changeDetector: ChangeDetectorRef,
              private _activatedRoute: ActivatedRoute,
              membersSandbox: MembersSandbox) {
    super(membersSandbox);
  }

  ngOnInit() {
    super.ngOnInit();

    const routeSubscription = this._activatedRoute.data.subscribe(data => {
      this._users = data["users"];
      this._changeDetector.markForCheck();
    });

    this._subscriptions.push(routeSubscription);
  }

  get users(): User[] {
    return this._users;
  }
}
