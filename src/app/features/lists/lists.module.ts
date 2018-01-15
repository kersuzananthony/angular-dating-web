import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ListsRouting} from "./lists.routing";
import {ListsComponent} from "./components/lists/lists.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ListsRouting
  ],
  declarations: [
    ListsComponent
  ]
})
export class ListsModule {}
