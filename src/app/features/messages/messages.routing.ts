import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {MessagesComponent} from "./components/messages/messages.component";

const routes: Routes = [
  {path: "", component: MessagesComponent, pathMatch: "full"}
];

export const MessagesRouting: ModuleWithProviders = RouterModule.forChild(routes);
