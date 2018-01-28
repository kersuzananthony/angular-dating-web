import {User} from "@core/models/user.model";
import {isNullOrUndefined} from "util";

export function transformUserPhotoUrl(user: User): User {
  if (isNullOrUndefined(user.photoUrl)) {
    user.photoUrl = "assets/images/user.png";
  }

  return user;
}
