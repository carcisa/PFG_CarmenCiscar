import { Actividad } from './actividad.model';

export interface UserToSend {
  id: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  email: string;
  password: string;
  roles: string[];
  actividadesFavoritas?: Actividad[];
}
