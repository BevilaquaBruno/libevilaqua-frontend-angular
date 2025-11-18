import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import env from '../../../env';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './reset-password.page.html',
  styleUrl: './reset-password.page.scss',
})
export class ResetPasswordPage {
  private fb = inject(FormBuilder);
  public APP_NAME = env.APP_NAME;
  public displayError = signal('');
  public displaySuccessMessage = signal('');
  private token = signal('');

  form = this.fb.group({
    password: this.fb.control<string>('', [Validators.required, Validators.minLength(6)]),
    password_confirmation: this.fb.control<string>('', [Validators.required]),
  },
    {
      validators: this.equalPasswords
    });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const urlToken = this.route.snapshot.queryParamMap.get('token');
    if (null != urlToken)
      this.token.set(urlToken);
  }

  equalPasswords(form: FormGroup) {
    const password = form.get('password')?.value;
    const password_confirmation = form.get('password_confirmation')?.value;

    if (password !== password_confirmation) {
      form.get('password_confirmation')?.setErrors({ differentPasswords: true });
    } else {
      form.get('password_confirmation')?.setErrors(null);
    }

    return null;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const password = this.form.get('password')?.value;
    const password_confirmation = this.form.get('password_confirmation')?.value;

    this.authService.resetPassword(password, password_confirmation, this.token()).subscribe({
      next: (data) => {
        this.displayError.set('');
        if (200 === data.statusCode) {
          this.displaySuccessMessage.set(data.message);
        }
      },
      error: (error) => {
        console.log(error);

        this.displaySuccessMessage.set('');
        let errorMessage = '';
        if (error.error.message && 401 != error.status)
          errorMessage = error.error.message
        else
          errorMessage = 'Erro ao resetar senha.';

        this.displayError.set(errorMessage);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
