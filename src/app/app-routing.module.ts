import { DetailTagComponent } from './components/tags/detail-tag/detail-tag.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { FormUserComponent } from './components/users/form-user/form-user.component';
import { ListTypesComponent } from './components/types/list-types/list-types.component';
import { FormTypeComponent } from './components/types/form-type/form-type.component';
import { DetailTypeComponent } from './components/types/detail-type/detail-type.component';
import { ListTagsComponent } from './components/tags/list-tags/list-tags.component';
import { FormTagComponent } from './components/tags/form-tag/form-tag.component';
import { ListGenresComponent } from './components/genre/list-genres/list-genres.component';
import { DetailGenreComponent } from './components/genre/detail-genre/detail-genre.component';
import { FormGenreComponent } from './components/genre/form-genre/form-genre.component';
import { ListPublishersComponent } from './components/publishers/list-publishers/list-publishers.component';
import { DetailPublisherComponent } from './components/publishers/detail-publisher/detail-publisher.component';
import { FormPublisherComponent } from './components/publishers/form-publisher/form-publisher.component';
import { ListAuthorsComponent } from './components/authors/list-authors/list-authors.component';
import { DetailAuthorComponent } from './components/authors/detail-author/detail-author.component';
import { FormAuthorComponent } from './components/authors/form-author/form-author.component';
import { ListBooksComponent } from './components/book/list-books/list-books.component';
import { DetailBookComponent } from './components/book/detail-book/detail-book.component';

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
    component: HomeComponent,
  },
  /* Start User */
  {
    path: 'usuarios',
    children: [
      {
        path: '',
        component: ListUsersComponent,
      },
      {
        path: ':id/detalhes',
        component: DetailUserComponent
      },
      {
        path: 'cadastrar',
        component: FormUserComponent
      },
      {
        path: ':id/editar',
        component: FormUserComponent
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
        component: ListTypesComponent,
      },
      {
        path: 'cadastrar',
        component: FormTypeComponent
      },
      {
        path: ':id/editar',
        component: FormTypeComponent
      },
      {
        path: ':id/detalhes',
        component: DetailTypeComponent
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
        component: ListPublishersComponent,
      },
      {
        path: 'cadastrar',
        component: FormPublisherComponent
      },
      {
        path: ':id/editar',
        component: FormPublisherComponent
      },
      {
        path: ':id/detalhes',
        component: DetailPublisherComponent
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
        path: 'cadastrar',
        component: FormAuthorComponent
      },
      {
        path: ':id/editar',
        component: FormAuthorComponent
      },
      {
        path: ':id/detalhes',
        component: DetailAuthorComponent
      }
    ]
  },
  /* End author */
    /* Start book */
    {
      path: 'livros',
      children: [
        {
          path: '',
          component: ListBooksComponent,
        },
        {
          path: ':id/detalhes',
          component: DetailBookComponent
        }
      ]
    },
    /* End book */
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
