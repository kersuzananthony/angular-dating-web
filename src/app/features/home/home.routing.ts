import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ModuleWithProviders} from "@angular/core";

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component: HomeComponent}
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(routes);
