import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListUsuariosComponent } from './components/usuarios/list-usuarios/list-usuarios.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailUsuarioComponent } from './components/usuarios/detail-usuario/detail-usuario.component';
import { FormUsuarioComponent } from './components/usuarios/form-usuario/form-usuario.component';
import { ListTiposComponent } from './components/tipos/list-tipos/list-tipos.component';
import { FormTipoComponent } from './components/tipos/form-tipo/form-tipo.component';
import { DetailTipoComponent } from './components/tipos/detail-tipo/detail-tipo.component';

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
      },
      {
        path: 'cadastrar',
        component: FormUsuarioComponent
      },
      {
        path: ':id/editar',
        component: FormUsuarioComponent
      }
    ]
  },

  /* End User */

  /* Start Type */
  {
    path: 'tipos',
    children: [
      {
        path: '',
        component: ListTiposComponent,
      },
      {
        path: 'cadastrar',
        component: FormTipoComponent
      },
      {
        path: ':id/editar',
        component: FormTipoComponent
      },
      {
        path: ':id/detalhes',
        component: DetailTipoComponent
      }
    ]
  },
  /* End Type */
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
