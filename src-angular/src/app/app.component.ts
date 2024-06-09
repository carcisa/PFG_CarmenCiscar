import { Component, OnInit } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { PlanSeleccionadoComponent } from './pages/plan-seleccionado/plan-seleccionado.component';
import { ActividadComponent } from './pages/actividad/actividad.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
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
    HttpClientModule,
    CommonModule,
    PlanSeleccionadoComponent,
    ActividadComponent


  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Planazo';

  ngOnInit(): void {
    initFlowbite();
  }

}
