import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from "./components/app/app.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";

import {AUTH_SERVICE, AuthService} from "./services/auth.service";
import {NETWORK_SERVICE, NetworkService} from "./services/network.service";
import {STORAGE_SERVICE, StorageService} from "./services/storage.service";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: NETWORK_SERVICE,
      useClass: NetworkService
    },
    {
      provide: STORAGE_SERVICE,
      useClass: StorageService
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
