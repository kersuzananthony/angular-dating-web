import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BsDatepickerModule, BsDropdownModule, TabsModule} from "ngx-bootstrap";
import {NgxGalleryModule} from "ngx-gallery";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule,
    BsDatepickerModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule,
    BsDatepickerModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule
  ]
})
export class SharedModule {}

