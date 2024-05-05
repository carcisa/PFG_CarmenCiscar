import { Actividad } from "./actividad.model";

export interface Destino {
  id?: number;
  nombre: string;
  imagen: string;
  actividades: Actividad[];
}
