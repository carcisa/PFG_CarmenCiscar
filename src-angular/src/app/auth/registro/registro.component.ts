import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
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
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Todos los campos son requeridos';
      return;
    }

    this.authService.signup(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

}
