export interface Usuario {
  id?: number;
  nombreUsuario: string;
  email: string;
  password: string;
  rol: Rol[];
}

export enum Rol {
  ADMIN = 'ADMIN',
  USER = 'USER'

}
