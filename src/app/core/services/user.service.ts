import {Inject, InjectionToken} from "@angular/core";
import {NETWORK_SERVICE, INetworkService} from "./network.service";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";
import {Token} from "@core/models/token.model";
import {isNullOrUndefined} from "util";
import {Photo} from "@core/models/photo.model";
import {of} from "rxjs/observable/of";
import "rxjs/add/observable/merge";
import {QueryResponse} from "@core/models/responses/query-response.model";
import {UserQuery} from "@core/models/queries/user-query.model";

export const USER_SERVICE = new InjectionToken<IUserService>("IUserService");

export interface IUserService {
  getUsers(query: UserQuery): Observable<QueryResponse<User>>;
  getUser(id: number): Observable<User>;
  getUserByToken(token: Token): Observable<User>;
  updateUser(token: Token, user: User): Observable<any>;
  setMainPhoto(token: Token, photo: Photo): Observable<any>;
  deletePhoto(token: Token, photo: Photo): Observable<any>;
  sendLike(token: Token, toUserId: number): Observable<any>;
}

export class UserService implements IUserService {

  private static readonly ENDPOINT_USERS = "users";
  private static readonly ENDPOINT_PHOTO_MAIN = (userId, photoId) => `users/${userId}/photos/${photoId}/main`;
  private static readonly ENDPOINT_PHOTO_DELETE = (userId, photoId) => `users/${userId}/photos/${photoId}`;
  private static readonly ENDPOINT_LIKE_USER = (fromUserId, toUserId) => `users/${fromUserId}/like/${toUserId}`;

  constructor(@Inject(NETWORK_SERVICE) private _networkService: INetworkService) {}

  public getUsers(query: UserQuery): Observable<QueryResponse<User>> {
    return this._networkService.get(UserService.ENDPOINT_USERS, query);
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

  public sendLike(token: Token, toUserId: number): Observable<any> {
    return this._throwIfInvalidToken(token)
      .mergeMap(validToken => {
        if (isNullOrUndefined(toUserId)) return Observable.throw("Caller did not provide toUserId.");

        return this._networkService.post(UserService.ENDPOINT_LIKE_USER(validToken.decodedToken.nameid, toUserId), {});
      });
  }

  private _throwIfInvalidToken(token: Token): Observable<Token> {
    if (isNullOrUndefined(token) || isNullOrUndefined(token.decodedToken) || isNullOrUndefined(token.decodedToken.nameid)) {
      return Observable.throw("User ID cannot be found on the provided token");
    }

    return of(token);
  }
}
