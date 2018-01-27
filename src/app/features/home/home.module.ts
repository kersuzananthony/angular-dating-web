import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {HomeRouting} from "./home.routing";
import {AuthModule} from "../auth/auth.module";
import {HomeSandbox} from "@app/features/home/home.sandbox";

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    AuthModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeSandbox
  ]
})
export class HomeModule {}
