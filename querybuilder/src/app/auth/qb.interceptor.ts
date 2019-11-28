import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {LoginService} from '../service/login/login.service';

import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( request.url.toString() !== 'http://35.154.235.8:8080/authenticate') {
      const dateTime = new Date().getTime() / 1000;
      console.log(dateTime);
      if (this.loginService.getTimeStamp().toString() < dateTime.toString()) {
        // make a reuest to update the token
        this.loginService.requestToken().then (data => {
          this.loginService.setToken(data);
        });
      }
      request = request.clone({
        setHeaders: {
            Authorization: 'Bearer ' + this.loginService.getToken()
        }
      });
    }
    return next.handle(request);
  }
}

/*const dateTime = new Date().getSeconds() / 1000;
if (this.loginService.getTimeStamp().toString() < dateTime.toString()) {
  // make a reuest to update the token
  this.loginService.requestToken().then (data => {
    this.loginService.setToken(data);
  });
}
request = request.clone({
  setHeaders: {
      Authorization: 'Bearer ' + this.loginService.getToken()
  }
});*/
