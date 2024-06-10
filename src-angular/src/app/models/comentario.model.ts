// src/app/models/comentario.model.ts
export interface Comentario {
  id?: number;
  titulo: string;
  descripcion: string;
  puntuacion: number;
  usuarioId: number;
  actividadId: number;
}
