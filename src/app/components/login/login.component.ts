import { Token } from '@angular/compiler';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { constants } from 'src/environments/environments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(
    private service: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  signIn(){
    if(this.formLogin.valid){
      this.service.signin(this.formLogin.value).subscribe((response) => {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/inicio']);
      });
    }
  }
}
