import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { ButtonComponent } from './Components/button/button.component';
import { FooterComponent } from './Components/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './Components/select/select.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { PlanSeleccionadoComponent } from './pages/plan-seleccionado/plan-seleccionado.component';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { MisDatosComponent } from './user/mis-datos/mis-datos.component';
import { MisOpinionesComponent } from './user/mis-opiniones/mis-opiniones.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { OpinionesComponent } from './pages/opiniones/opiniones.component';
import { NuevaActividadComponent } from './pages/admin/nueva-actividad/nueva-actividad.component';






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ButtonComponent,
    FooterComponent,
    InicioComponent,
    FlexLayoutServerModule,
    CategoriasComponent,
    ContactoComponent,
    ActividadesComponent,
    PlanesComponent,
    FormsModule,
    SelectComponent,
    CommonModule,
    PlanSeleccionadoComponent,
    ActividadComponent,
    MisDatosComponent,
    MisOpinionesComponent,
    OpinionesComponent,
    FormsModule,
    NuevaActividadComponent

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Planazo';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }

}
