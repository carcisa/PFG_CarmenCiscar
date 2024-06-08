import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Usuario = new Usuario('', '', '', '');
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  onLogin() {
    console.log('Email:', this.user.email); // Debugging
    console.log('Password:', this.user.password); // Debugging

    const existingToken = this.tokenService.getToken();
    if (existingToken) {
      Swal.fire('Ya estás autenticado', 'Tu sesión ya está abierta', 'info');
      this.router.navigate(['/']);
      return;
    }

    this.authService.login(this.user).subscribe({
      next: (tokenResponse) => {
        const token = tokenResponse.token;
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('token', token);
        }
        const isAdmin = tokenResponse.roles.includes('admin');
        const navigateTo = isAdmin ? '/bandeja' : '/inicio';
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([navigateTo]).then(() => {
            Swal.fire('Login correcto').then(() => {
              window.location.reload();
            });
          });
        });
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.userService.getUsers(token).subscribe({
        next: (response) => {
          this.user = response.data;
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
