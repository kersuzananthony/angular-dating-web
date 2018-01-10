import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ModuleWithProviders} from "@angular/core";
import {MemberListComponent} from "./components/members/member-list/member-list.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {ListsComponent} from "./components/lists/lists.component";
import {AuthGuard} from "./guards/auth.guard";
import {MemberDetailComponent} from "./components/members/member-detail/member-detail.component";
import {MemberDetailResolver} from "./resolvers/member-detail.resolver";
import {MemberListResolver} from "./resolvers/member-list.resolver";

const appRoutes: Routes = [
  {path: "home", component: HomeComponent},
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {path: "members", component: MemberListComponent, resolve: {users: MemberListResolver}},
      {path: "members/:id", component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
      {path: "messages", component: MessagesComponent},
      {path: "lists", component: ListsComponent}
    ]
  },
  {path: "**", redirectTo: "home", pathMatch: "full"}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);


