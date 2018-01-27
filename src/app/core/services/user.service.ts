import {Inject, InjectionToken} from "@angular/core";
import {NETWORK_SERVICE, INetworkService} from "./network.service";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";
import {Token} from "@core/models/token.model";
import {isNullOrUndefined} from "util";
import {Photo} from "@core/models/photo.model";
import {of} from "rxjs/observable/of";
import "rxjs/add/observable/merge";

export const USER_SERVICE = new InjectionToken<IUserService>("IUserService");

export interface IUserService {
  getUsers(): Observable<User[]>;
  getUser(id: number): Observable<User>;
  getUserByToken(token: Token): Observable<User>;
  updateUser(token: Token, user: User): Observable<any>;
  setMainPhoto(token: Token, photo: Photo): Observable<any>;
  deletePhoto(token: Token, photo: Photo): Observable<any>;
}

export class UserService implements IUserService {

  private static readonly ENDPOINT_USERS = "users";
  private static readonly ENDPOINT_PHOTO_MAIN = (userId, photoId) => `users/${userId}/photos/${photoId}/main`;
  private static readonly ENDPOINT_PHOTO_DELETE = (userId, photoId) => `users/${userId}/photos/${photoId}`;

  constructor(@Inject(NETWORK_SERVICE) private _networkService: INetworkService) {}

  public getUsers(): Observable<User[]> {
    return this._networkService.get(UserService.ENDPOINT_USERS);
  }

  public getUser(id: number): Observable<User> {
    return this._networkService.get(`${UserService.ENDPOINT_USERS}/${id}`);
  }

  public getUserByToken(token: Token): Observable<User> {
    return this._throwIfInvalidToken(token)
      .mergeMap(validToken => this._networkService.get(`${UserService.ENDPOINT_USERS}/${validToken.decodedToken.nameid}`));
  }

  public updateUser(token: Token, user: User): Observable<any> {
    return this._throwIfInvalidToken(token)
      .mergeMap(validToken => this._networkService.put(`${UserService.ENDPOINT_USERS}/${validToken.decodedToken.nameid}`, user));
  }

  public setMainPhoto(token: Token, photo: Photo): Observable<any> {
    return this._throwIfInvalidToken(token)
      .mergeMap(validToken => {
        if (isNullOrUndefined(photo) || isNullOrUndefined(photo.id)) {
          return Observable.throw("Photo is undefined or has no ID.");
        }

        return this._networkService.post(UserService.ENDPOINT_PHOTO_MAIN(validToken.decodedToken.nameid, photo.id), {});
      });
  }

  public deletePhoto(token: Token, photo: Photo): Observable<any> {
    return this._throwIfInvalidToken(token)
      .mergeMap(validToken => {
        if (isNullOrUndefined(photo) || isNullOrUndefined(photo.id)) {
          return Observable.throw("Photo is undefined or has no ID.");
        }

        return this._networkService.delete(UserService.ENDPOINT_PHOTO_DELETE(validToken.decodedToken.nameid, photo.id));
      });
  }

  private _throwIfInvalidToken(token: Token): Observable<Token> {
    if (isNullOrUndefined(token) || isNullOrUndefined(token.decodedToken) || isNullOrUndefined(token.decodedToken.nameid)) {
      return Observable.throw("User ID cannot be found on the provided token");
    }

    return of(token);
  }
}
