import {RouterModule, Routes} from "@angular/router";
import {MemberListComponent} from "./components/member-list/member-list.component";
import {MemberListResolver} from "./resolvers/member-list.resolver";
import {MemberEditResolver} from "./resolvers/member-edit.resolver";
import {PreventUnsavedChangesGuard} from "@core/guards/prevent-unsaved-changes.guard";
import {MemberDetailResolver} from "./resolvers/member-detail.resolver";
import {MemberDetailComponent} from "./components/member-detail/member-detail.component";
import {MemberEditComponent} from "./components/member-edit/member-edit.component";
import {ModuleWithProviders} from "@angular/core";

const routes: Routes = [
  {path: "", component: MemberListComponent, resolve: {users: MemberListResolver}, pathMatch: "full"},
  {path: "edit", component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]},
  {path: ":id", component: MemberDetailComponent, resolve: {user: MemberDetailResolver}}
];

export const MembersRouting: ModuleWithProviders = RouterModule.forChild(routes);
