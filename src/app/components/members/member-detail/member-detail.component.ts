import "hammerjs";
import {Component, OnInit} from "@angular/core";
import {BaseComponent} from "../../base.component";
import {User} from "../../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.scss"]
})
export class MemberDetailComponent extends BaseComponent implements OnInit {

  private _user: User;
  private _galleryOptions: NgxGalleryOptions[];
  private _galleryImages: NgxGalleryImage[];

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    super();
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

  ngOnInit() {
    this._activatedRoute.data.subscribe(data => this._user = data["user"]);

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
