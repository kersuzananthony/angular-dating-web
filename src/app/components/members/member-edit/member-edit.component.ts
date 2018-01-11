import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {BaseComponent} from "../../base.component";
import {User} from "../../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {USER_SERVICE, UserServiceInterface} from "../../../services/user.service";
import {AUTH_SERVICE, AuthServiceInterface} from "../../../services/auth.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.scss"]
})
export class MemberEditComponent extends BaseComponent implements OnInit {

  private _user: User;

  @ViewChild("editForm") editForm: NgForm;

  constructor(@Inject(USER_SERVICE) private _userService: UserServiceInterface,
              @Inject(AUTH_SERVICE) private _authService: AuthServiceInterface,
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
    if (this.editForm.valid) {
      this._userService.updateUser(this._authService.getToken().decodedToken.nameid, this.user)
        .subscribe(
          () => {
            this._messageService.success("Your profile has been successfully updated!");
            this.editForm.reset(this._user);
          },
          error => this._handleError(error)
        );
    }
  }
}
