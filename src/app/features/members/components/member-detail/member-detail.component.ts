import "hammerjs";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery";
import {User} from "@core/models/user.model";
import {BaseSandboxComponent} from "@shared/components/base-sandbox.component";
import {MemberDetailSandbox} from "@members/sandbox/member-detail.sandbox";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.scss"]
})
export class MemberDetailComponent extends BaseSandboxComponent<MemberDetailSandbox> implements OnInit, OnDestroy {

  private _user: User;
  private _galleryOptions: NgxGalleryOptions[];
  private _galleryImages: NgxGalleryImage[];

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              memberDetailSandbox: MemberDetailSandbox) {
    super(memberDetailSandbox);
  }

  get user(): User {
    return this._user;
  }

  get galleryOptions(): NgxGalleryOptions[] {
    return this._galleryOptions;
  }

  get galleryImages(): NgxGalleryImage[] {
    return this._galleryImages;
  }

  public ngOnInit() {
    super.ngOnInit();

    const routeSubscription = this._activatedRoute.data.subscribe(data => this._user = data["user"]);
    this._subscriptions.push(routeSubscription);

    this._galleryOptions = [{
      width: "500px",
      height: "500px",
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Fade,
      preview: false
    }];

    this._galleryImages = this._getImages();
  }

  public ngOnDestroy() {
    this.sandbox.unloadMemberDetail();

    super.ngOnDestroy();
  }

  public likeUser() {
    this.sandbox.likeUser();
  }

  private _getImages() {
    return this._user.photos.map(p => {
      return {
        small: p.url,
        medium: p.url,
        big: p.url,
        description: p.description
      };
    });
  }

  public onBackClicked() {
    this._router.navigate(["members"]);
  }
}
