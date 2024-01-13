import { DetailTagComponent } from './components/tags/detail-tag/detail-tag.component';
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
import { ListTagsComponent } from './components/tags/list-tags/list-tags.component';
import { FormTagComponent } from './components/tags/form-tag/form-tag.component';
import { ListGenresComponent } from './components/genre/list-genres/list-genres.component';
import { DetailGenreComponent } from './components/genre/detail-genre/detail-genre.component';
import { FormGenreComponent } from './components/genre/form-genre/form-genre.component';
import { ListEditorasComponent } from './components/editoras/list-editoras/list-editoras.component';
import { DetailEditoraComponent } from './components/editoras/detail-editora/detail-editora.component';
import { FormEditoraComponent } from './components/editoras/form-editora/form-editora.component';
import { ListAuthorsComponent } from './components/authors/list-authors/list-authors.component';
import { DetailAuthorComponent } from './components/authors/detail-author/detail-author.component';

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

  /* Start Tag */
  {
    path: 'tags',
    children: [
      {
        path: '',
        component: ListTagsComponent,
      },
      {
        path: 'cadastrar',
        component: FormTagComponent
      },
      {
        path: ':id/editar',
        component: FormTagComponent
      },
      {
        path: ':id/detalhes',
        component: DetailTagComponent
      }
    ]
  },
  /* End Tag */
  /* Start Genre */
  {
    path: 'generos',
    children: [
      {
        path: '',
        component: ListGenresComponent,
      },
      {
        path: 'cadastrar',
        component: FormGenreComponent
      },
      {
        path: ':id/editar',
        component: FormGenreComponent
      },
      {
        path: ':id/detalhes',
        component: DetailGenreComponent
      }
    ]
  },
  /* End Genre */
  /* Start Publisher */
  {
    path: 'editoras',
    children: [
      {
        path: '',
        component: ListEditorasComponent,
      },
      {
        path: 'cadastrar',
        component: FormEditoraComponent
      },
      {
        path: ':id/editar',
        component: FormEditoraComponent
      },
      {
        path: ':id/detalhes',
        component: DetailEditoraComponent
      }
    ]
  },
  /* End Publisher */
  /* Start author */
  {
    path: 'autores',
    children: [
      {
        path: '',
        component: ListAuthorsComponent,
      },
      {
        path: ':id/detalhes',
        component: DetailAuthorComponent
      }
    ]
  },
  /* End author */
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
