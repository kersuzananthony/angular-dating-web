import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "@app/shared/shared.module";

import {ModelStateErrorComponent} from "./components/model-state-error/model-state-error.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ModelStateErrorComponent
  ],
  exports: [
    ModelStateErrorComponent
  ]
})
export class UIKitModule {}
