import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  user: Usuario = new Usuario('', '', '', '');
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(event: Event) {
    event.preventDefault();

    // Verifica que las contraseñas coincidan
    if (this.user.password !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    // Usa el servicio para registrar al usuario
    this.authService.signup(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // Redirige a la página de login y recarga la página
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Error durante el registro:', err);
      }
    });
  }
}
