import { Comentario } from "./comentario.model";
import { Destino } from "./destino.model";

export interface Actividad {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  puntuacion: number;
  direccion: string;
  horario: string;
  imagen: string;
  destino: Destino;
  comentarios: Comentario[];
}

export enum Categoria {
  CULTURA = 'CULTURA',
  DEPORTE = 'DEPORTE',
  GASTRONOMIA = 'GASTRONOMIA',
  NATURALEZA = 'NATURALEZA',
  OCIO = 'OCIO'
}


