import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from "@angular/material/grid-list";
import env from '../../env';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    RouterModule
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  public APP_NAME = env.APP_NAME;
  public generalError = '';

  form = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit(): void {
    alert('Thanks!');
    if (this.form.invalid) return;

    const email = this.form.controls.email.value!;
    const password = this.form.controls.password.value!;
    this.authService.signIn(email, password).subscribe({
      next: (data) => {console.log("success", data)},
      error: (error) => {
        if (401 === error.status) {
          this.generalError = 'E-mail ou senha incorretos.';
        }
      }
    });
  }

  resetPassword() {
    alert('Reset password.')
  }

  newLibrary() {
    alert('new library.')
  }
}
