import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { UserToSend } from '../../models/userToSend.model';

@Component({
  selector: 'app-mis-datos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss']
})
export class MisDatosComponent implements OnInit {
  usuario: Usuario;
  isModalOpen = false;
  newPassword: string = '';
  confirmPassword: string = '';
  preferenciaGeneral: boolean = false;
  preferenciaPersonalizada: boolean = true;
  rolSeleccionado: string = 'user';
  rolesDisponibles: string[] = ['admin', 'user'];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.usuario = new Usuario(0, '', '', '', '', new Set());
  }

  ngOnInit() {
    this.authService.usuario$.subscribe((usuario: Usuario | null) => {
      if (usuario) {
        this.usuario = usuario;
        this.rolSeleccionado = Array.from(usuario.roles)[0] || 'user';
      } else {
        this.usuario = new Usuario(0, '', '', '', '', new Set());
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  changePassword() {
    if (!this.newPassword || !this.confirmPassword) {
        console.error('La nueva contraseña y la confirmación de la contraseña no pueden estar vacías');
        return;
    }

    if (this.newPassword !== this.confirmPassword) {
        console.error('Las contraseñas no coinciden');
        return;
    }

    const token = this.tokenService.getToken();
    if (token) {
        const rolesArray = Array.from(this.usuario.roles); // Convert Set<string> to string[]
        const updatedUser: UserToSend = { ...this.usuario, password: this.newPassword, roles: rolesArray };
        this.userService.updateUser(token, this.usuario.id, updatedUser).subscribe(
            response => {
                console.log('Contraseña actualizada:', response);
                this.closeModal();
            },
            (error: any) => {
                console.error('Error al actualizar la contraseña:', error);
            }
        );
    }
  }

  saveChanges() {
    const token = this.tokenService.getToken();
    if (token) {
      const rolesArray = [this.rolSeleccionado]; // Convert selected role to string[]
      const userToSend: UserToSend = { ...this.usuario, roles: rolesArray };
      this.userService.updateUser(token, this.usuario.id, userToSend).subscribe(
        response => {
          this.router.navigate(['/']);
          console.log('Usuario actualizado:', response);
        },
        (error: any) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }
}
