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
import { LibraryList } from './interfaces/library-list.interface';
import { MatAutocomplete, MatOption, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LoadingComponent } from "../components/loading/loading.component";

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
    MatAutocompleteTrigger,
    LoadingComponent
  ]
})
export class LoginComponent {
  /**
   * VARIÁVEIS FORM LOGIN
   * START
   */
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

  isLoginLoading = signal(false);
  isSelectLibraryLoading = signal(false);

  /**
 * VARIÁVEIS FORM LOGIN
 * END
 *
 * VARIÁVEIS FORM SELECT LIBRARY
 * START
 */
  libraryCtrl = new FormControl<string | LibraryList>('');
  searchText = signal('');

  filteredLibraries = computed(() => {
    const search = this.searchText().toLowerCase();

    return this.loginResponse().libraries.filter(
      lib => lib.description.toLowerCase().includes(search)
    );
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  /**
  * MÉTODOS FORM LOGIN
  * END
  */
  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoginLoading.set(true);

    const email = this.form.controls.email.value!;
    const password = this.form.controls.password.value!;
    this.authService.signIn(email, password).subscribe({
      next: (data) => {
        this.loginResponse.set(data)
        this.navigateTab(1);
        this.isLoginLoading.set(false);
      },
      error: (error) => {
        let errorMessage = '';
        if (error.error.message && 401 != error.status)
          errorMessage = error.error.message
        else
          errorMessage = 'Usuário ou senha incorretos.';

        this.generalLoginError.set(errorMessage);
        this.isLoginLoading.set(false);
      }
    });
  }

  resetPassword() {
    alert('Reset password.')
  }

  newLibrary() {
    alert('new library.')
  }
  /**
 * MÉTODOS FORM LOGIN
 * END
 *
 * MÉTODOS FORM SELECT LIBRARY
 * START
 */
  displayLibrary = (value: string | LibraryList) => {
    if (!value) return '';

    return typeof value === 'string'
      ? value
      : value.description;
  };

  selectLibrary(event: MatAutocompleteSelectedEvent) {
    this.isSelectLibraryLoading.set(true);
    const lib = event.option.value;
    this.libraryCtrl.setValue(lib);

    this.authService.selectLibrary(this.loginResponse().email, this.loginResponse().password, lib.id).subscribe({
      next: async (data) => {
        if (!data.access_token) {
          this.generalLibraryError.set('Erro grave ao logar');
        }

        localStorage.setItem('token', data.access_token);
        this.isSelectLibraryLoading.set(false);
        this.router.navigate(['inicio']);
      },
      error: (error) => {
        let errorMessage = '';
        if (error.error.message && 401 != error.status)
          errorMessage = error.error.message
        else
          errorMessage = 'Usuário ou senha incorretos.';

        this.generalLibraryError.set(errorMessage);
        this.isSelectLibraryLoading.set(false);
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
    this.generalLibraryError.set('');
    this.navigateTab(0);
  }

  navigateTab(tab: number) {
    this.selectedIndex.set(tab);
  }

  /**
* MÉTODOS FORM SELECT LIBRARY
* END
*/
}
