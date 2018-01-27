import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BsDropdownModule, TabsModule} from "ngx-bootstrap";
import {NgxGalleryModule} from "ngx-gallery";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    BsDropdownModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  exports: [
    FormsModule,
    RouterModule,
    BsDropdownModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule
  ]
})
export class SharedModule {}

