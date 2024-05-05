import { RouterModule, Routes } from '@angular/router';
import { PlanesComponent } from './pages/planes/planes.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';

export const routes: Routes = [


  { path: '', component: InicioComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent},
  { path: '**', redirectTo: "", pathMatch:"full" },

];

