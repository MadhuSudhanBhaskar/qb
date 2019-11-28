import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {QueryLogin, LoginData} from '../interface/login.interface';
import { LoginService } from '../service/login/login.service';

/**
 * Component
 * @description this component is responsible to authenticate the user
 * @param username
 * @param password
 * @returns on success full it redirects to dashboard page and error the screen
 * is updated with error message
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public authProblem = false;
  public loginFormData: QueryLogin = {
    username: '',
    password: ''
  };

  public userDetials: LoginData;
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private route: Router) { }

  /**
   * on init
   * @description the login form is initialised with forms and
   * validator is added to each control
   */
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Login  of login component
   * @description This method is called when the user triggers the button for login
   * this will call the service which makes a http call to the api
   * @param fromData which contains username and password of type loginFromData
   * @returns redirects the user if auths work or will show a message on screen with error
   */
  public login = (formData) => {
    console.log(formData);
    if (formData.status) {
      (document.querySelector('.overlay') as HTMLElement).style.display = 'block';
      this.loginFormData.username = formData.value.username;
      this.loginFormData.password = formData.value.password;
      this.loginService.authUniConnect(this.loginFormData)
      .then(data => {
        console.log(data);
        this.loginService.setToken(data);
        this.loginService.getUserDetails()
        .then( userData => {
          console.log(userData.authorities[0].authority);
          this.userDetials = userData;
          this.loginService.setUserDetail(userData);
          (document.querySelector('.overlay') as HTMLElement).style.display = 'none';
          this.route.navigate(['dashboard']);
        });
      })
      .catch (error => {
        console.log(error);
        (document.querySelector('.overlay') as HTMLElement).style.display = 'none';
        this.authProblem = true;
      });
    }
  }
}
