import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SendResetPasswordPage } from './pages/send-reset-password/send-reset-password.page';
import { ResetPasswordPage } from './pages/reset-password/reset-password.page';

const currentToken =  localStorage.getItem('token');

export const routes: Routes = [
  {
    path: '',
    redirectTo: (null == currentToken || '' == currentToken.trim()) ? 'login' : 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomePage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'esqueci-a-senha',
    component: SendResetPasswordPage
  },
  {
    path: 'resetar-senha',
    component: ResetPasswordPage
  }
];
