import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {HomeRouting} from "./home.routing";
import {AuthModule} from "../auth/auth.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    AuthModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
