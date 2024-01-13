import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { ListUsuariosComponent } from './components/usuarios/list-usuarios/list-usuarios.component';
import { DetailUsuarioComponent } from './components/usuarios/detail-usuario/detail-usuario.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DefaultButtonComponent } from './components/general/default-button/default-button.component';
import { IconButtonComponent } from './components/general/icon-button/icon-button.component';
import { ConfirmDialogComponent } from './components/general/confirm-dialog/confirm-dialog.component';
import { FormUsuarioComponent } from './components/usuarios/form-usuario/form-usuario.component';
import { ListTiposComponent } from './components/tipos/list-tipos/list-tipos.component';
import { FormTipoComponent } from './components/tipos/form-tipo/form-tipo.component';
import { DetailTipoComponent } from './components/tipos/detail-tipo/detail-tipo.component';
import { ListTagsComponent } from './components/tags/list-tags/list-tags.component';
import { DetailTagComponent } from './components/tags/detail-tag/detail-tag.component';
import { FormTagComponent } from './components/tags/form-tag/form-tag.component';
import { ListGenresComponent } from './components/genre/list-genres/list-genres.component';
import { DetailGenreComponent } from './components/genre/detail-genre/detail-genre.component';
import { FormGenreComponent } from './components/genre/form-genre/form-genre.component';
import { ListEditorasComponent } from './components/editoras/list-editoras/list-editoras.component';
import { DetailEditoraComponent } from './components/editoras/detail-editora/detail-editora.component';
import { FormEditoraComponent } from './components/editoras/form-editora/form-editora.component';
import { ListAuthorsComponent } from './components/authors/list-authors/list-authors.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    MenuComponent,
    ListUsuariosComponent,
    DetailUsuarioComponent,
    PageNotFoundComponent,
    DefaultButtonComponent,
    IconButtonComponent,
    ConfirmDialogComponent,
    FormUsuarioComponent,
    ListTiposComponent,
    FormTipoComponent,
    DetailTipoComponent,
    ListTagsComponent,
    DetailTagComponent,
    FormTagComponent,
    ListGenresComponent,
    DetailGenreComponent,
    FormGenreComponent,
    ListEditorasComponent,
    DetailEditoraComponent,
    FormEditoraComponent,
    ListAuthorsComponent,
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
