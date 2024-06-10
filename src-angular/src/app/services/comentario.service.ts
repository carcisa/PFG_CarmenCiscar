import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = 'http://localhost:8081/api/comentarios';

  constructor(private http: HttpClient) {}


  getAllComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}`);
  }

  getComentarioById(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.apiUrl}/${id}`);
  }

  createComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, comentario);
  }

  updateComentario(id: number, comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/${id}`, comentario);
  }

  deleteComentario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener comentarios por ID de actividad
  getComentariosPorActividadId(actividadId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/actividades/${actividadId}/comentarios`);
  }

  // Obtener comentarios por ID de usuario
  getComentariosPorUsuarioId(usuarioId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/usuarios/${usuarioId}/comentarios`);
  }
}
