import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SendResetPasswordPage } from './pages/send-reset-password/send-reset-password.page';
import { ResetPasswordPage } from './pages/reset-password/reset-password.page';
import { NewLibraryPage } from './pages/new-library/new-library.page';
import { ConfirmAccessPage } from './pages/confirm-access/confirm-access.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { authGuard } from './guard/auth.guard';
import { TypeListComponent } from './pages/types/list/type-list.component';
import { TypeFormPage } from './pages/types/form/type-form.page';
import { GenreListComponent } from './pages/genres/list/genre-list.component';
import { GenreFormPage } from './pages/genres/form/genre-form.page';

const currentToken = localStorage.getItem('token');

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    canActivate: [authGuard],
    component: HomePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'esqueci-a-senha',
    component: SendResetPasswordPage,
  },
  {
    path: 'resetar-senha',
    component: ResetPasswordPage,
  },
  {
    path: 'nova-biblioteca',
    component: NewLibraryPage,
  },
  {
    path: 'confirmar-acesso',
    component: ConfirmAccessPage,
  },
  {
    path: '404',
    component: NotFoundPage
  },
  {
    path: 'tipos',
    canActivate: [authGuard],
    component: TypeListComponent
  },
  {
    path: 'tipos/novo',
    canActivate: [authGuard],
    component: TypeFormPage
  },
  {
    path: 'tipos/editar/:id',
    canActivate: [authGuard],
    component: TypeFormPage
  },
  {
    path: 'generos',
    canActivate: [authGuard],
    component: GenreListComponent
  },
  {
    path: 'generos/novo',
    canActivate: [authGuard],
    component: GenreFormPage
  },
  {
    path: 'generos/editar/:id',
    canActivate: [authGuard],
    component: GenreFormPage
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
