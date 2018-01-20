import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {BaseComponent} from "../../../components/base.component";
import {Token} from "../../../../core/models/token.model";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent extends BaseComponent {

  @Input() token: Token;

  @Output() logout = new EventEmitter<void>();

  public onLogout(event: Event) {
    if (event) event.stopPropagation();

    this.logout.emit();
  }
}
