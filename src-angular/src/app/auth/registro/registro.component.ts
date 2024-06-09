import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Todos los campos son requeridos';
      return;
    }

    const newUser: Usuario = new Usuario(
      0, // id predeterminado
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.password,
      new Set(['user']) // Asignar el rol 'user' por defecto
    );

    this.authService.signup(newUser).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  ngOnInit(): void {}
}
