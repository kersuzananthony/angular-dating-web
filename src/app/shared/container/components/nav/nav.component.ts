import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {BaseComponent} from "@shared/components/base.component";
import {Token} from "@core/models/token.model";
import {User} from "@core/models/user.model";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent extends BaseComponent {

  @Input() token: Token;
  @Input() user: User;

  @Output() logout = new EventEmitter<void>();

  public onLogout(event: Event) {
    if (event) event.stopPropagation();

    this.logout.emit();
  }
}
