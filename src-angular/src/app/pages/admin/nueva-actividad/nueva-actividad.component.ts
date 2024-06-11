import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Actividad, Categoria } from '../../../models/actividad.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Destino } from '../../../models/destino.model';
import { DestinoService } from '../../../services/destino.service';

@Component({
  selector: 'app-nueva-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-actividad.component.html',
  styleUrl: './nueva-actividad.component.scss'
})
export class NuevaActividadComponent implements OnInit {
  actividad: Actividad = {
    nombre: '',
    descripcion: '',
    categoria: Categoria.CULTURA,
    puntuacion: 0,
    direccion: '',
    horario: '',
    imagen: '',
    destino: { id: 0, nombre: '', imagen: '', actividades: [] },
    comentarios: []
  };
  categorias = ['CULTURA', 'DEPORTE', 'OCIO', 'NATURALEZA','GASTRONOMIA'];
  selectedFile: File | null = null;
  destinos: Destino[] = [];

  constructor(private http: HttpClient, private router: Router, private destinoService: DestinoService) {}

  ngOnInit() {
    this.destinoService.getAllDestinos().subscribe(
      (data: Destino[]) => {
        this.destinos = data;
      },
      error => {
        console.error('Error fetching destinos', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    formData.append('actividad', JSON.stringify(this.actividad));

    this.http.post('http://localhost:8081/api/actividades', formData).subscribe({
      next: (response) => {
        console.log('Actividad guardada:', response);
        this.router.navigate(['/actividades']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creando actividad:', error);
        alert(`Error creando actividad: ${error.message}`);
      }
    });
  }
}
