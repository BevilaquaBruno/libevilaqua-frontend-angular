import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SendResetPasswordPage } from './pages/send-reset-password/send-reset-password.page';
import { ResetPasswordPage } from './pages/reset-password/reset-password.page';
import { NewLibraryPage } from './pages/new-library/new-library.page';
import { ConfirmAccessPage } from './pages/confirm-access/confirm-access.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { authGuard } from './guard/auth.guard';

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
    path: '**',
    redirectTo: '404'
  }
];
