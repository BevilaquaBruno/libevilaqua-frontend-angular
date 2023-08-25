import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListUsuariosComponent } from './components/usuarios/list-usuarios/list-usuarios.component';

let currentToken = localStorage.getItem('token');

const routes: Routes = [
  {
    path: '',
    redirectTo:
      currentToken === null ||
      currentToken?.trim() === ''
        ? 'login'
        : 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  /* Start User */
  {
    path: 'usuarios',
    component: ListUsuariosComponent
  }

  /* End User */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
