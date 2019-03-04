import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  facebookLogin(){
    this.authService.doFacebookAuth()
    .then(res => {
      this.router.navigate(['/profile']);
    })
  }

  gitHubLogin(){
    this.authService.doGitHubAuth()
    .then(res => {
      this.router.navigate(['/profile']);
    })
  }

  googleLogin(){
    this.authService.doGoogleAuth()
    .then(res => {
      this.router.navigate(['/profile']);
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/profile']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
}
