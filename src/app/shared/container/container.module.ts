import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "@app/shared/shared.module";
import {AuthModule} from "@app/features/auth/auth.module";

import {NavComponent} from "./components/nav/nav.component";
import {LayoutComponent} from "./components/layout/layout.component";

import {LayoutSandbox} from "./components/layout/layout.sandbox";

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    NavComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class ContainerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContainerModule,
      providers: [
        LayoutSandbox
      ]
    };
  }
}
