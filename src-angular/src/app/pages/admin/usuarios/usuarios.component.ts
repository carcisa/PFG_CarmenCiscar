import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  token: string = '';
  usuarioSeleccionado: Usuario | null = null;
  esNuevoUsuario: boolean = false;
  usuarioActual: Usuario = new Usuario(0, '', '', '', '', new Set<string>());
  mostrarModalCrearEditar: boolean = false;
  mostrarModalEliminar: boolean = false;
  rolSeleccionado: string = 'user'; // Almacena el rol seleccionado temporalmente

  constructor(private userService: UserService, private authService: AuthService, private tokenService: TokenService) {
    this.authService.usuario$.subscribe(usuario => {
      if (usuario) {
        this.token = this.tokenService.getToken() || '';
        this.cargarUsuarios();
      }
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.getUsers(this.token).subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => console.error('Error al obtener usuarios:', error)
    });
  }

  getRol(usuario: Usuario): string {
    return Array.from(usuario.roles)[0] || 'user';
  }

  abrirModalCrear(): void {
    this.usuarioActual = new Usuario(0, '', '', '', '', new Set<string>());
    this.rolSeleccionado = 'user';
    this.esNuevoUsuario = true;
    this.mostrarModalCrearEditar = true;
  }

  abrirModalEditar(usuario: Usuario): void {
    this.usuarioActual = { ...usuario };
    this.rolSeleccionado = Array.from(usuario.roles)[0] || 'user';
    this.esNuevoUsuario = false;
    this.mostrarModalCrearEditar = true;
  }

  abrirModalEliminar(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
    this.mostrarModalEliminar = true;
  }

  cerrarModal(): void {
    this.mostrarModalCrearEditar = false;
    this.mostrarModalEliminar = false;
  }

  confirmarEliminarUsuario(): void {
    if (this.usuarioSeleccionado) {
      this.userService.deleteUser(this.token, this.usuarioSeleccionado.id).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (error) => console.error('Error al eliminar usuario:', error)
      });
    }
  }

  onSubmit(): void {
    this.usuarioActual.roles = new Set<string>([this.rolSeleccionado]);
    if (this.esNuevoUsuario) {
      this.userService.createUser(this.token, this.usuarioActual).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (error) => console.error('Error al crear usuario:', error)
      });
    } else {
      this.userService.updateUser(this.token, this.usuarioActual.id, this.usuarioActual).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (error) => console.error('Error al actualizar usuario:', error)
      });
    }
  }
}
