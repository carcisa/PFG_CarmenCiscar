import { Usuario } from './usuario.model';
import { Actividad } from './actividad.model';

export interface Comentario {
  id?: number;
  titulo: string;
  descripcion: string;
  puntuacion: number;
  usuario: Usuario;
  actividad: Actividad;
}
