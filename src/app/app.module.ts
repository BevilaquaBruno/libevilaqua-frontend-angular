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
