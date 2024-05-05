export class Usuario {
  id?: number;
  nombreUsuario?: string;
  public email: string = "";
  public password: string = "";
  rol: Rol[] = [];

  constructor(password:string, email:string){
    this.email = email;
    this.password = password;
  }



}

export enum Rol {
  ADMIN = 'ADMIN',
  USER = 'USER'

}
