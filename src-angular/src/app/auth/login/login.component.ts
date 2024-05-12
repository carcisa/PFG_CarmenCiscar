import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user: Usuario = new Usuario('', '');
  token: string | null = null;
  users: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  onLogin(event: any) {
    event.preventDefault();
    console.log('Email:', this.user.email); // Debugging
    console.log('Password:', this.user.password);// Debugging
    const existingToken = this.tokenService.getToken();
    if (existingToken) {
      Swal.fire('Ya estás autenticado', 'Tu sesión ya está abierta', 'info');
      this.router.navigate(['/']);
      return;
    }

    // Proceso de inicio de sesión normal
    this.authService.login(this.user).subscribe({
      next: (tokenResponse) => {
        const token = tokenResponse.token;
        this.token = token;
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('token', token);
        }
        const isAdmin = tokenResponse.roles.includes('admin');
        this.router.navigate([isAdmin ? '/bandeja' : '/inicio']).then(() => {
          Swal.fire('Login correcto').then(() =>
            this.router.navigate(['/bandeja']));
            //  window.location.reload());
        });
      },
      error: (error) => {
        Swal.fire('Error en la petición', 'No hemos podido conectar', 'error');
      },
    });
  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.userService.getUsers(token).subscribe({
        next: (response) => {
          this.users = response.data;
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    } else {
      console.log('Token aún no creado');
    }
  }
}
