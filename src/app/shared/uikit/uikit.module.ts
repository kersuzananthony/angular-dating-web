import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared.module";

import {NavComponent} from "./components/nav/nav.component";
import {ModelStateErrorComponent} from "./components/model-state-error/model-state-error.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    NavComponent,
    ModelStateErrorComponent
  ],
  exports: [
    NavComponent,
    ModelStateErrorComponent
  ]
})
export class UIKitModule {}
