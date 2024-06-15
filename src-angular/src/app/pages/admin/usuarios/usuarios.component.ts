import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserToSend } from '../../../models/userToSend.model'; // Asegúrate de que esta línea importe el modelo correcto

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;
  esNuevoUsuario: boolean = false;
  usuarioActual: Usuario = new Usuario(0, '', '', '', '', new Set<string>());
  mostrarModalCrearEditar: boolean = false;
  mostrarModalEliminar: boolean = false;
  rolSeleccionado: string = 'ROL_USER'; // Almacena el rol seleccionado temporalmente
  password: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.getUsers().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => console.error('Error al obtener usuarios:', error)
    });
  }

  getRol(usuario: Usuario): string {
    return Array.from(usuario.roles)[0] || 'ROL_USER';
  }

  abrirModalCrear(): void {
    this.usuarioActual = new Usuario(0, '', '', '', '', new Set<string>());
    this.rolSeleccionado = 'ROL_USER';
    this.password = '';
    this.esNuevoUsuario = true;
    this.mostrarModalCrearEditar = true;
  }

  abrirModalEditar(usuario: Usuario): void {
    this.usuarioActual = { ...usuario };
    this.rolSeleccionado = Array.from(usuario.roles)[0] || 'ROL_USER';
    this.password = this.usuarioActual.password;
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
      this.userService.deleteUser(this.usuarioSeleccionado.id).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (error) => console.error('Error al eliminar usuario:', error)
      });
    }
  }

  onSubmit(): void {
    const rolesArray = [this.rolSeleccionado];
    const userToSend: UserToSend = {
      id: this.usuarioActual.id,
      nombreUsuario: this.usuarioActual.nombreUsuario,
      apellidoUsuario: this.usuarioActual.apellidoUsuario,
      email: this.usuarioActual.email,
      password: this.password,
      roles: rolesArray
    };

    if (this.esNuevoUsuario) {
      if (this.rolSeleccionado === 'ROL_ADMIN') {
        this.userService.createUserAdmin(userToSend).subscribe({
          next: () => {
            this.cargarUsuarios();
            this.cerrarModal();
          },
          error: (error) => console.error('Error al crear usuario administrador:', error)
        });
      } else {
        this.userService.createUser(userToSend).subscribe({
          next: () => {
            this.cargarUsuarios();
            this.cerrarModal();
          },
          error: (error) => console.error('Error al crear usuario:', error)
        });
      }
    } else {
      this.userService.updateUser(this.usuarioActual.id, userToSend).subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
        },
        error: (error) => console.error('Error al actualizar usuario:', error)
      });
    }
  }
}
