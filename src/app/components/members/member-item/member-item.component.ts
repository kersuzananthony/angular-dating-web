import {Component, Input} from "@angular/core";
import {BaseComponent} from "../../base.component";
import {User} from "../../../models/user.model";

@Component({
  selector: "app-member-item",
  templateUrl: "./member-item.component.html",
  styleUrls: ["./member-item.component.scss"]
})
export class MemberItemComponent extends BaseComponent {

  @Input() user: User;

}
