import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {BaseComponent} from "@shared/components/base.component";
import {User} from "@core/models/user.model";

@Component({
  selector: "app-member-item",
  templateUrl: "./member-item.component.html",
  styleUrls: ["./member-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberItemComponent extends BaseComponent {

  @Input() user: User;
  @Input() likingUser: User;

  @Output() likeUser = new EventEmitter<User>();

  public onLikeUser(event: Event) {
    if (event) event.stopPropagation();

    this.likeUser.emit(this.user);
  }
}
