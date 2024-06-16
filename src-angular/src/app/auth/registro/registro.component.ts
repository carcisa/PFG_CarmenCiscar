import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
      nombreUsuario: ['', Validators.required],
      apellidoUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Todos los campos son requeridos';
      return;
    }

      // Crear un nuevo objeto Usuario con los datos del formulario
      const newUser: Usuario = new Usuario(
        0, // id predeterminado
        this.registerForm.value.nombreUsuario,
        this.registerForm.value.apellidoUsuario,
        this.registerForm.value.email,
        this.registerForm.value.password,
        new Set(['user']) // Asignar el rol 'user' por defecto
      );

      console.log('Datos enviados:', newUser);  // Log para verificar los datos que se envían

      // Llamar al servicio de registro
      this.authService.signup(newUser).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          // Mostrar mensaje de éxito y redirigir al login
          Swal.fire({
            title: 'Registro Exitoso',
            text: 'Te has registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.error('Error en el registro:', err);
        }
      });
    }


  ngOnInit(): void {}
}
