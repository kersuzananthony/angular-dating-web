import {Inject, InjectionToken} from "@angular/core";
import {NETWORK_SERVICE, NetworkServiceInterface} from "./network.service";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.model";

export const USER_SERVICE = new InjectionToken<UserServiceInterface>("UserServiceInterface");

export interface UserServiceInterface {
  getUsers(): Observable<User[]>;
  getUser(id: number): Observable<User>;
  updateUser(id: number, user: User): Observable<any>;
}

export class UserService implements UserServiceInterface {

  private static readonly ENDPOINT_USERS = "users";

  constructor(@Inject(NETWORK_SERVICE) private _networkService: NetworkServiceInterface) {}

  public getUsers(): Observable<User[]> {
    return this._networkService.get(UserService.ENDPOINT_USERS);
  }

  public getUser(id: number): Observable<User> {
    return this._networkService.get(`${UserService.ENDPOINT_USERS}/${id}`);
  }


  public updateUser(id: number, user: User): Observable<any> {
    return this._networkService.put(`${UserService.ENDPOINT_USERS}/${id}`, user);
  }
}
