import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() type: 'raised' | 'stroked' | 'flat' = 'raised';

}
