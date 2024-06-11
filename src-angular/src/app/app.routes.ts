import { RouterModule, Routes } from '@angular/router';
import { PlanesComponent } from './pages/planes/planes.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { RoleGuard } from './guards/RoleGuard. guards';
import { AlmeriaComponent } from './pages/destinos/almeria/almeria.component';
import { CadizComponent } from './pages/destinos/cadiz/cadiz.component';
import { CordobaComponent } from './pages/destinos/cordoba/cordoba.component';
import { GranadaComponent } from './pages/destinos/granada/granada.component';
import { HuelvaComponent } from './pages/destinos/huelva/huelva.component';
import { JaenComponent } from './pages/destinos/jaen/jaen.component';
import { MalagaComponent } from './pages/destinos/malaga/malaga.component';
import { SevillaComponent } from './pages/destinos/sevilla/sevilla.component';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { PlanSeleccionadoComponent } from './pages/plan-seleccionado/plan-seleccionado.component';
import { MisDatosComponent } from './user/mis-datos/mis-datos.component';
import { MisOpinionesComponent } from './user/mis-opiniones/mis-opiniones.component';
import { MisPlanesComponent } from './user/mis-planes/mis-planes.component';
import { OpinionesComponent } from './pages/opiniones/opiniones.component';
import { NuevaActividadComponent } from './pages/admin/nueva-actividad/nueva-actividad.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { EditarActividadComponent } from './pages/admin/editar-actividad/editar-actividad.component';



export const routes: Routes = [


  { path: '', component: InicioComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'planSeleccionado', component: PlanSeleccionadoComponent},
  { path: 'destinos/:id/planes', component: PlanesComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'actividad/:id', component: ActividadComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'almeria', component: AlmeriaComponent},
  { path: 'cadiz', component: CadizComponent},
  { path: 'cordoba', component: CordobaComponent},
  { path: 'granada', component: GranadaComponent},
  { path: 'huelva', component: HuelvaComponent},
  { path: 'jaen', component: JaenComponent},
  { path: 'malaga', component: MalagaComponent},
  { path: 'sevilla', component: SevillaComponent},
  { path: 'mis-datos', component: MisDatosComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROL_USER'] } },
  { path: 'mis-planes', component: MisPlanesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROL_USER'] } },
  { path: 'mis-opiniones', component: MisOpinionesComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROL_USER'] } },
  { path: 'opiniones/:id', component: OpinionesComponent},
  { path: 'editar-actividad/:id', component: EditarActividadComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROL_ADMIN'] } },
  { path: 'nuevaActividad', component: NuevaActividadComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROL_ADMIN'] } },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROL_ADMIN'] } },
  { path: '**', redirectTo: "", pathMatch:"full" },

];


