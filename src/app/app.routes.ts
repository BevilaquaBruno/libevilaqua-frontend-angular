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
import { TagListComponent } from './pages/tags/list/tag-list.component';
import { TagFormPage } from './pages/tags/form/tag-form.page';
import { PublisherListComponent } from './pages/publishers/list/publisher-list.component';
import { PublisherFormPage } from './pages/publishers/form/publisher-form.page';
import { PersonListComponent } from './pages/people/list/person-list.component';
import { PersonFormPage } from './pages/people/form/person-form.page';
import { AuthorListComponent } from './pages/authors/list/author-list.component';
import { AuthorFormPage } from './pages/authors/form/author-form.page';

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
    path: 'tags',
    canActivate: [authGuard],
    component: TagListComponent
  },
  {
    path: 'tags/novo',
    canActivate: [authGuard],
    component: TagFormPage
  },
  {
    path: 'tags/editar/:id',
    canActivate: [authGuard],
    component: TagFormPage
  },
  {
    path: 'editoras',
    canActivate: [authGuard],
    component: PublisherListComponent
  },
  {
    path: 'editoras/novo',
    canActivate: [authGuard],
    component: PublisherFormPage
  },
  {
    path: 'editoras/editar/:id',
    canActivate: [authGuard],
    component: PublisherFormPage
  },
  {
    path: 'pessoas',
    canActivate: [authGuard],
    component: PersonListComponent
  },
  {
    path: 'pessoas/novo',
    canActivate: [authGuard],
    component: PersonFormPage
  },
  {
    path: 'pessoas/editar/:id',
    canActivate: [authGuard],
    component: PersonFormPage
  },
  {
    path: 'autores',
    canActivate: [authGuard],
    component: AuthorListComponent
  },
  {
    path: 'autores/novo',
    canActivate: [authGuard],
    component: AuthorFormPage
  },
  {
    path: 'autores/editar/:id',
    canActivate: [authGuard],
    component: AuthorFormPage
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
