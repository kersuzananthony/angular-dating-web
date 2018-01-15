import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from "../../../../shared/components/base.component";
import {User} from "../../../../core/models/user.model";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"]
})
export class MemberListComponent extends BaseComponent implements OnInit {

  private _users: User[];

  constructor(private _activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe(data => this._users = data["users"]);
  }

  get users(): User[] {
    return this._users;
  }
}
