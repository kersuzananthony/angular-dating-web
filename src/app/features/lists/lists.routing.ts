import {RouterModule, Routes} from "@angular/router";
import {ListsComponent} from "./components/lists/lists.component";
import {ModuleWithProviders} from "@angular/core";

const routes: Routes = [
  {path: "", component: ListsComponent, pathMatch: "full"}
];

export const ListsRouting: ModuleWithProviders = RouterModule.forChild(routes);
