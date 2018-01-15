import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BsDropdownModule, TabsModule} from "ngx-bootstrap";
import {NgxGalleryModule} from "ngx-gallery";

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  exports: [
    FormsModule,
    RouterModule,
    BsDropdownModule,
    TabsModule,
    NgxGalleryModule
  ]
})
export class SharedModule {}

