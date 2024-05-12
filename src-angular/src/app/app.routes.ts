import { RouterModule, Routes } from '@angular/router';
import { PlanesComponent } from './pages/planes/planes.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { BandejaComponent } from './pages/admin/bandeja/bandeja.component';
import { RoleGuard } from './guards/RoleGuard. guards';
import { EstadisticasComponent } from './pages/admin/estadisticas/estadisticas.component';
import { ModeradorComponent } from './pages/admin/moderador/moderador.component';
import { PerfilesComponent } from './pages/admin/perfiles/perfiles.component';

export const routes: Routes = [


  { path: '', component: InicioComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'destinos/:id/planes', component: PlanesComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'bandeja', component: BandejaComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin'] } },
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin'] } },
  { path: 'moderador', component: ModeradorComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin'] } },
  { path: 'perfiles', component: PerfilesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin'] } },

  { path: '**', redirectTo: "", pathMatch:"full" },

];

