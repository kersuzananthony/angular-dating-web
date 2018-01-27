import {
  Component, EventEmitter, Input, OnInit,
  Output
} from "@angular/core";
import {BaseComponent} from "@shared/components/base.component";
import {Photo} from "@core/models/photo.model";
import {FileUploader} from "ng2-file-upload";
import {isNullOrUndefined} from "util";
import {Token} from "@core/models/token.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: "app-member-photo-editor",
  templateUrl: "./member-photo-editor.component.html",
  styleUrls: ["./member-photo-editor.component.scss"]
})
export class MemberPhotoEditorComponent extends BaseComponent implements OnInit {

  @Input() photos: Photo[] = [];
  @Input() token: Token;

  @Output() updateMainPhoto = new EventEmitter<Photo>();
  @Output() deletePhoto = new EventEmitter<Photo>();
  @Output() uploadPhotoSuccess = new EventEmitter<{item: any, response: any}>();
  @Output() uploadPhotoError = new EventEmitter();

  public hasBaseDropZoneOver = false;
  public uploader: FileUploader;

  public ngOnInit() {
    if (!this.token) return;

    this.uploader = new FileUploader({
      url: environment.baseUrl + "users/" + this.token.decodedToken.nameid + "/photos",
      authToken: "Bearer " + this.token.rawToken,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = ((item, response, status, headers) => this.uploadPhotoSuccess.emit({item, response}));
    this.uploader.onErrorItem = ((item, response, status, headers) => this.uploadPhotoError.emit());
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public setMainPhoto(photo: Photo, event: Event) {
    if (!isNullOrUndefined(event)) event.stopPropagation();

    this.updateMainPhoto.emit(photo);
  }

  public onDeletePhoto(photo: Photo, event: Event) {
    if (event) event.stopPropagation();

    if (isNullOrUndefined(photo)) return;

    this.deletePhoto.emit(photo);
  }
}
