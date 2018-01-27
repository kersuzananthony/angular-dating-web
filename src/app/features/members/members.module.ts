import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MembersRouting} from "./members.routing";

import {MemberListComponent} from "./components/member-list/member-list.component";
import {MemberDetailComponent} from "./components/member-detail/member-detail.component";
import {MemberItemComponent} from "./components/member-item/member-item.component";
import {MemberEditComponent} from "./components/member-edit/member-edit.component";
import {MemberPhotoEditorComponent} from "@members/components/member-photo-editor/member-photo-editor.component";

import {MemberListResolver} from "./resolvers/member-list.resolver";
import {MemberDetailResolver} from "./resolvers/member-detail.resolver";
import {MemberEditResolver} from "./resolvers/member-edit.resolver";
import {SharedModule} from "@shared/shared.module";

import {MembersSandbox} from "@members/sandbox/members.sandbox";
import {MemberDetailSandbox} from "@members/sandbox/member-detail.sandbox";
import {MemberEditSandbox} from "@members/sandbox/member-edit.sandbox";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MembersRouting
  ],
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberItemComponent,
    MemberEditComponent,
    MemberPhotoEditorComponent
  ],
  providers: [
    MemberListResolver,
    MemberDetailResolver,
    MemberEditResolver,
    MembersSandbox,
    MemberDetailSandbox,
    MemberEditSandbox
  ],
})
export class MembersModule {}
