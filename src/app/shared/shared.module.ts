import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BsDatepickerModule, BsDropdownModule, ButtonsModule, PaginationModule, TabsModule} from "ngx-bootstrap";
import {NgxGalleryModule} from "ngx-gallery";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {FileUploadModule} from "ng2-file-upload";
import {PipeModule} from "@shared/pipe/pipe.module";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    PipeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    PipeModule
  ]
})
export class SharedModule {}

