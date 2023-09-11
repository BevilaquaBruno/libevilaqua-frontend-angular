import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListUsuariosComponent } from './components/usuarios/list-usuarios/list-usuarios.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailUsuarioComponent } from './components/usuarios/detail-usuario/detail-usuario.component';

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
    children: [
      {
        path: '',
        component: ListUsuariosComponent,
      },
      {
        path: ':id/detalhes',
        component: DetailUsuarioComponent
      }
    ]
  },

  /* End User */
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
