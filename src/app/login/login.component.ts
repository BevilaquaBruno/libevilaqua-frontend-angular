import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from "@angular/material/grid-list";
import env from '../../env';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { SignInResponse } from './interfaces/sign-in-response.interface';
import { MatAutocomplete, MatOption, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


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
    RouterModule,
    MatTabsModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  public APP_NAME = env.APP_NAME;
  public generalLoginError = signal('');
  public generalLibraryError = signal('');

  @ViewChild('loginTabs') loginTabs!: MatTabGroup;
  public selectedIndex = signal(0);

  public loginResponse = signal<SignInResponse>({
    id: 0,
    name: '',
    email: '',
    libraries: [],
    password: '',
  });

  form = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [Validators.required, Validators.minLength(6)]),
  });

  libraryCtrl = new FormControl({ id: 0, description: '' });

  filteredLibraries = computed(() => {
    const value = this.libraryCtrl.value?.description?.toLowerCase() ?? '';

    return this.loginResponse().libraries.filter(lib =>
      lib.description.toLowerCase().includes(value)
    );
  });


  displayLibrary = (lib: LibraryList) => {
    return lib?.description ?? '';
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit(): void {
    if (this.form.invalid) return;

    const email = this.form.controls.email.value!;
    const password = this.form.controls.password.value!;
    this.authService.signIn(email, password).subscribe({
      next: (data) => {
        this.loginResponse.set(data)
        this.navigateTab(1);
      },
      error: (error) => {
        let errorMessage = '';
        if (error.error.message && 401 != error.status)
          errorMessage = error.error.message
        else
          errorMessage = 'Usuário ou senha incorretos.';

        this.generalLoginError.set(errorMessage);
      }
    });
  }

  selectLibrary(event: MatAutocompleteSelectedEvent) {
    const lib = event.option.value;
    console.log(lib);

    this.authService.selectLibrary(this.loginResponse().email, this.loginResponse().password, lib.id).subscribe({
      next: (data) => {
        if (!data.access_token) {
          this.generalLibraryError.set('Erro grave ao logar');
        }

        localStorage.setItem('token', data.access_token);
        this.router.navigate(['inicio']);
      },
      error: (error) => {
        let errorMessage = '';
        if (error.error.message && 401 != error.status)
          errorMessage = error.error.message
        else
          errorMessage = 'Usuário ou senha incorretos.';

        this.generalLibraryError.set(errorMessage);
      }
    });
  }

  goBackToLogin() {
    this.loginResponse.set({
      id: 0,
      name: '',
      email: '',
      libraries: [],
      password: '',
    });
    this.navigateTab(0);
  }

  navigateTab(tab: number) {
    this.selectedIndex.set(tab);
  }

  resetPassword() {
    alert('Reset password.')
  }

  newLibrary() {
    alert('new library.')
  }
}
