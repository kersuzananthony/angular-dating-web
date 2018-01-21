import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "@core/guards/auth.guard";

const appRoutes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", loadChildren: "app/features/home/home.module#HomeModule"},
  {
    path: "",
    canActivate: [AuthGuard],
    runGuardsAndResolvers: "always",
    children: [
      {path: "members", loadChildren: "app/features/members/members.module#MembersModule"},
      {path: "messages", loadChildren: "app/features/messages/messages.module#MessagesModule"},
      {path: "lists", loadChildren: "app/features/lists/lists.module#ListsModule"}
    ]
  },
  {path: "**", redirectTo: "home", pathMatch: "full"}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: true,
  preloadingStrategy: PreloadAllModules
});


