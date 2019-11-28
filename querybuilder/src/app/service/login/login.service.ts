import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as api from '../../api/api.constant.json';
import { QueryLogin, AuthData, LoginData } from '../../interface/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authData: AuthData;
  private userData: LoginData;

  public auth$: Promise<AuthData>;
  public userDetails$: Promise<LoginData>;

  constructor(private http: HttpClient ) { }
  public loginUrl: string = api.path + api.login;
  public userUrl: string = api.path + api.admin;
  public authUniConnect = (data: QueryLogin): Promise<AuthData> =>   {
    console.log(this.loginUrl);
    this.auth$ = this.http
                .post<AuthData>(this.loginUrl,
                  {username : data.username, password: data.password}).toPromise();
    return this.auth$;
  }

  public setToken = (token: AuthData): void => {
    this.authData = token;
  }

  public getToken = (): string => {
    return this.authData.token;
  }

  public getTimeStamp = (): string => {
    console.log(this.authData);
    return this.authData.exp;
  }

  public getUserDetails = (): Promise<LoginData> => {
    this.userDetails$ = this.http
                        .get<LoginData>(this.userUrl)
                        //.pipe(user => { return new LoginData(users)})
                        .toPromise();
    return this.userDetails$;
  }

  public setUserDetail = (userData: LoginData): void => {
    this.userData = userData;
  }

  public getUserDetail = (): LoginData => {
    return this.userData;
  }

  public requestToken = (): Promise<AuthData> => {
    this.auth$ = this.http
    .post<AuthData>(this.loginUrl, {token : this.authData.token}).toPromise();
    return this.auth$;
  }
}
