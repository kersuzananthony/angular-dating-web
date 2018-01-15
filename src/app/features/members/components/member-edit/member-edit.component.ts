import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {BaseComponent} from "../../../../shared/components/base.component";
import {User} from "../../../../core/models/user.model";
import {USER_SERVICE, IUserService} from "../../../../core/services/user.service";
import {AUTH_SERVICE, IAuthService} from "../../../../core/services/auth.service";
import {IEditableComponent} from "../../../../shared/components/editable.component";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.scss"]
})
export class MemberEditComponent extends BaseComponent implements OnInit, IEditableComponent {

  private _user: User;

  @ViewChild("editForm") form: NgForm;

  constructor(@Inject(USER_SERVICE) private _userService: IUserService,
              @Inject(AUTH_SERVICE) private _authService: IAuthService,
              private _activatedRoute: ActivatedRoute) {
    super();
  }

  get user(): User {
    return this._user;
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe(data => this._user = data["user"]);
  }

  public updateUser() {
    if (this.form.valid) {
      this._userService.updateUser(this._authService.getToken().decodedToken.nameid, this.user)
        .subscribe(
          () => {
            this._messageService.success("Your profile has been successfully updated!");
            this.form.reset(this._user);
          },
          error => this._handleError(error)
        );
    }
  }
}
