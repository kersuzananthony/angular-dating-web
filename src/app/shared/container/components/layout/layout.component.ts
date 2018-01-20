import {ChangeDetectionStrategy, Component} from "@angular/core";
import {LayoutSandbox} from "./layout.sandbox";
import {BaseSandboxComponent} from "@app/shared/components/base-sandbox.component";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent extends BaseSandboxComponent<LayoutSandbox> {

  constructor(layoutSandbox: LayoutSandbox) {
    super(layoutSandbox);
  }

  public onLogout() {
    this.sandbox.logout();
  }
}

