import {Component, Inject, OnInit} from "@angular/core";
import {BaseComponent} from "../../base.component";
import {User} from "../../../models/user.model";
import {USER_SERVICE, UserServiceInterface} from "../../../services/user.service";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"]
})
export class MemberListComponent extends BaseComponent implements OnInit {

  private _users: User[];

  constructor(@Inject(USER_SERVICE) private _userService: UserServiceInterface) {
    super();
  }

  ngOnInit() {
    this._loadUsers();
  }

  get users(): User[] {
    return this._users;
  }

  private _loadUsers() {
    this._userService.getUsers()
      .subscribe(
        users => this._users = users,
        err => this._handleError(err)
      );
  }
}
