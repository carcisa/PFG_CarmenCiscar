import { RouterModule, Routes } from '@angular/router';
import { PlanesComponent } from './pages/planes/planes.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [


  { path: '', component: InicioComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: "", pathMatch:"full" },

];

