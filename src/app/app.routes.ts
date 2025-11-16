import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const currentToken =  localStorage.getItem('token');

export const routes: Routes = [
  {
    path: '',
    redirectTo: (null == currentToken || '' == currentToken.trim()) ? 'login' : 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
