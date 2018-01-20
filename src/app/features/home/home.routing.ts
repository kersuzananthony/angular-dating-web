import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ModuleWithProviders} from "@angular/core";

const routes: Routes = [
  {path: "", component: HomeComponent}
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(routes);
