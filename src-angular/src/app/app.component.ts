import { Component } from '@angular/core';
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
    SelectComponent


  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Planazo';

}
