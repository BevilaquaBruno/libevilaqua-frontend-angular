import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DefaultButtonComponent } from './components/general/default-button/default-button.component';
import { IconButtonComponent } from './components/general/icon-button/icon-button.component';
import { ConfirmDialogComponent } from './components/general/confirm-dialog/confirm-dialog.component';
import { FormUserComponent } from './components/users/form-user/form-user.component';
import { ListTypesComponent } from './components/types/list-types/list-types.component';
import { FormTypeComponent } from './components/types/form-type/form-type.component';
import { DetailTypeComponent } from './components/types/detail-type/detail-type.component';
import { ListTagsComponent } from './components/tags/list-tags/list-tags.component';
import { DetailTagComponent } from './components/tags/detail-tag/detail-tag.component';
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
import { PopupComponent } from './components/general/popup/popup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ListUsersComponent,
    DetailUserComponent,
    PageNotFoundComponent,
    DefaultButtonComponent,
    IconButtonComponent,
    ConfirmDialogComponent,
    FormUserComponent,
    ListTypesComponent,
    FormTypeComponent,
    DetailTypeComponent,
    ListTagsComponent,
    DetailTagComponent,
    FormTagComponent,
    ListGenresComponent,
    DetailGenreComponent,
    FormGenreComponent,
    ListPublishersComponent,
    DetailPublisherComponent,
    FormPublisherComponent,
    ListAuthorsComponent,
    DetailAuthorComponent,
    FormAuthorComponent,
    ListBooksComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
