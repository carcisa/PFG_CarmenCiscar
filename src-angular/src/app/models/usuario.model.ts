

export class Usuario {
  public id: number;
  public nombreUsuario: string;
  public apellidoUsuario: string;
  public email: string;
  public password: string;
  public roles: Set<string>;

  constructor(id: number, nombreUsuario: string, apellidoUsuario: string, email: string, password: string, roles: Set<string>) {
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.apellidoUsuario = apellidoUsuario;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
