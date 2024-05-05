import { Component } from '@angular/core';
import { ButtonComponent } from '../../Components/button/button.component';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.scss'
})
export class PlanesComponent {

}
