import { Token } from '@angular/compiler';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { constants } from 'src/environments/environments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin! :FormGroup;
  loginError :number = 0;

  constructor(
    private service: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token')?.trim() !== ''
    ) {
      this.router.navigate(['/inicio']);
    }
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  signIn() {
    this.loginError = 0;
    if (this.formLogin.valid) {
      this.service.signin(this.formLogin.value).subscribe(
        (successfullResponse) => {
          localStorage.setItem('token', successfullResponse.access_token);
          this.router.navigate(['/inicio']);
        },
        (failedResponse) => {
          this.loginError = 1;
        }
      );
    }
  }

  signInValid (){
    if(this.formLogin.valid)
      return 'button-success';
    return '';
  }
}
