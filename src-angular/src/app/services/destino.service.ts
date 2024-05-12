import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destino } from '../models/destino.model';
import { Actividad } from '../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  private apiUrl = 'http://localhost:8081/api/destinos';

  constructor(private http: HttpClient) {}


  getAllDestinos(): Observable<Destino[]> {
    return this.http.get<Destino[]>(`${this.apiUrl}/`);
  }

  getDestinoById(id: number): Observable<Destino> {
    return this.http.get<Destino>(`${this.apiUrl}/${id}`);
  }

  // Obtener las actividades asociadas a un destino
  getActividadesByDestinoId(id: number): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}/${id}/actividades`);
  }

  createDestino(destino: Destino): Observable<Destino> {
    return this.http.post<Destino>(this.apiUrl, destino);
  }

  // Agregar una actividad a un destino existente
  addActividadToDestino(destinoId: number, actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(`${this.apiUrl}/${destinoId}/actividades`, actividad);
  }

  updateDestino(id: number, destino: Destino): Observable<Destino> {
    return this.http.put<Destino>(`${this.apiUrl}/${id}`, destino);
  }

  deleteDestino(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDestinoByNombre(nombre: string): Observable<Destino> {
    return this.http.get<Destino>(`${this.apiUrl}/buscar/${nombre}`);
  }
}
