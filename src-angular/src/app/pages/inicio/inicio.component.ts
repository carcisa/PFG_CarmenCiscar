import { Component } from '@angular/core';
import { ButtonComponent } from '../../Components/button/button.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
