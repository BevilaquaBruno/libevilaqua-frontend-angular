import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import env from '../../../env';
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-send-reset-password.page',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatIcon
],
  templateUrl: './send-reset-password.page.html',
  styleUrl: './send-reset-password.page.scss',
})
export class SendResetPasswordPage {
  private fb = inject(FormBuilder);
  public APP_NAME = env.APP_NAME;
  public displayError = signal('');
  public displaySuccessMessage = signal('');

  form = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit() {
    if (this.form.invalid) return;

    const email = this.form.controls.email.value!;
    this.authService.sendResetPassword(email).subscribe({
      next: (data) => {
        this.displayError.set('');
        if (200 === data.statusCode) {
          this.displaySuccessMessage.set(data.message);
        }
      },
      error: (error) => {
        this.displaySuccessMessage.set('');
        let errorMessage = '';
        if (error.error.message && 401 != error.status)
          errorMessage = error.error.message
        else
          errorMessage = 'Erro ao enviar e-mail.';

        this.displayError.set(errorMessage);
      }
    });

  }

  goBackToLogin() {
    this.displayError.set('');
    this.router.navigate(['login']);
  }

}
