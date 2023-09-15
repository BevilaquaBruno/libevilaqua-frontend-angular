import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
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
      return ' bg-violet-700 hover:bg-violet-600';
    return ' bg-gray-500';
  }

  returnInputClass(field: string){
    if(field == 'login'){
      if(this.formLogin.get('email')?.errors?.['email'] && this.formLogin.get('email')?.touched)
        return ' border-2 border-red-500 focus:border-red-500';
    }else if (field == 'password'){
      if(this.formLogin.get('password')?.errors?.['required'] && this.formLogin.get('password')?.touched){
        return ' border-2 border-red-500 focus:border-red-500';
      }
    }
    return ' border-0 border-b-2 focus:border-gray-500';
  }
}
