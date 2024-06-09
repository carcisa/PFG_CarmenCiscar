import { Actividad } from './actividad.model';

export class Usuario {
  public id: number;
  public nombreUsuario: string;
  public apellidoUsuario: string;
  public email: string;
  public password: string;
  public roles: Set<string>;
  public actividadesFavoritas?: Actividad[];

  constructor(id: number, nombreUsuario: string, apellidoUsuario: string, email: string, password: string, roles: Set<string>, actividadesFavoritas?: Actividad[]) {
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.apellidoUsuario = apellidoUsuario;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.actividadesFavoritas = actividadesFavoritas;
  }
}
