
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,
    CommonModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  user = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    roles: [] as string[]
  };

  constructor(private authService: AuthService) {}

  onLogin(event: Event) {
    event.preventDefault();

    // Usa el servicio para registrar al usuario
    this.authService.signup(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // Redirige al perfil, a una página de inicio de sesión, etc.
      },
      error: (err) => {
        console.error('Error durante el registro:', err);
      }
    });
  }
}
