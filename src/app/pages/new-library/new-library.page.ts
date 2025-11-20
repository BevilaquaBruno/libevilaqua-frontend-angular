import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import env from '../../../env';
import { MatInputModule } from '@angular/material/input';
import { Languages } from '../../enums/languages.enum';
import { MatSelectModule } from '@angular/material/select';
import { MatDivider } from "@angular/material/divider";
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-new-library',
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIcon,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDivider
  ],
  templateUrl: './new-library.page.html',
  styleUrl: './new-library.page.scss',
})
export class NewLibraryPage {
  private fb = inject(FormBuilder);
  public APP_NAME = env.APP_NAME;
  public displayError = signal('');
  public displaySuccessMessage = signal('');
  public languages = Object.values(Languages);

  form = this.fb.group({
    name: this.fb.control<string>('', [Validators.required, Validators.maxLength(50)]),
    email: this.fb.control<string>('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    password: this.fb.control<string>('', [Validators.required, Validators.minLength(6)]),
    password_confirmation: this.fb.control<string>('', [Validators.required]),
    language: this.fb.control<Languages>(Languages.PTBR, [Validators.required]),
    libraryDescription: this.fb.control<string>('', [Validators.required, Validators.maxLength(50)])
  },
    {
      validators: this.equalPasswords
    });

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

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

    this.displayError.set('');
    const name = this.form.controls['name'].value!;
    const email = this.form.controls['email'].value!;
    const password = this.form.controls['password'].value!;
    const password_confirmation = this.form.controls['password_confirmation'].value!;
    const language = this.form.controls['language'].value!;
    const libraryDescription = this.form.controls['libraryDescription'].value!;

    this.userService.newWithLibrary(name, email, password, password_confirmation, language, libraryDescription).subscribe({
      next: (data) => {
        if (data.id > 0) {
          this.displaySuccessMessage.set('Biblioteca criada com sucesso! redirecionando para o login...');
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }
      },
      error: (error) => {
        let errorMessage = '';
        if (error.error.message && 401 != error.status)
          errorMessage = error.error.message
        else
          errorMessage = 'Usuário ou senha incorretos.';

        this.displayError.set(errorMessage);
      }
    });

  }

  goBackToLogin() {
    this.displayError.set('');
    this.displaySuccessMessage.set('');
    this.router.navigate(['login']);
  }
}
