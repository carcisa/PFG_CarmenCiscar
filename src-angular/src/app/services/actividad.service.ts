import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private apiUrl = 'http://localhost:8081/api/actividades';

  constructor(private http: HttpClient) {}


  getAllActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}`);
  }

  getActividadById(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.apiUrl}/${id}`);
  }

  // createActividad(actividad: Actividad): Observable<Actividad> {
  //   return this.http.post<Actividad>(this.apiUrl, actividad);
  // }

  createActividad(actividadData: FormData): Observable<any> {
    return this.http.post<Actividad>(this.apiUrl, actividadData);
  }

  updateActividad(id: number, actividad: Actividad): Observable<Actividad>;
  updateActividad(id: number, actividadData: FormData): Observable<any>;
  updateActividad(id: number, data: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, data);
}



  deleteActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener la puntuación promedio de una actividad
  getPuntuacionPromedioPorActividadId(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}/puntuacionPromedio`);
  }
}
