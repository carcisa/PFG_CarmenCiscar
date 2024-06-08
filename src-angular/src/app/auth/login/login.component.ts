import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    const existingToken = this.tokenService.getToken();
    if (existingToken) {
      Swal.fire('Ya estás autenticado', 'Tu sesión ya está abierta', 'info');
      this.router.navigate(['/']);
      return;
    }

    this.authService.login({ email, password }).subscribe({
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
          // Handle response
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
