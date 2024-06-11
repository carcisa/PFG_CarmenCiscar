import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Actividad, Categoria } from '../../../models/actividad.model';
import { Destino } from '../../../models/destino.model';
import { DestinoService } from '../../../services/destino.service';
import { ActividadService } from '../../../services/actividad.service';

@Component({
  selector: 'app-editar-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-actividad.component.html',
  styleUrl: './editar-actividad.component.scss'
})
export class EditarActividadComponent implements OnInit {
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
  categorias = ['CULTURA', 'DEPORTE', 'OCIO', 'NATURALEZA', 'GASTRONOMIA'];
  selectedFile: File | null = null;
  destinos: Destino[] = [];
  actividadId: number | null = null;
  previewUrl: string | null = null;


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private destinoService: DestinoService,
    private actividadService: ActividadService
  ) {}

  ngOnInit() {
    this.actividadId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.actividadId) {
      this.loadActividad(this.actividadId);
    }
    this.loadDestinos();
  }

  loadActividad(id: number) {
    this.actividadService.getActividadById(id).subscribe({
      next: (data: Actividad) => {
        this.actividad = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching actividad', error);
      }
    });
  }

  loadDestinos() {
    this.destinoService.getAllDestinos().subscribe({
      next: (data: Destino[]) => {
        this.destinos = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching destinos', error);
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      // Asegúrate de que selectedFile no es null antes de usarlo
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile); // Este método espera un Blob, no null
      }
    } else {
      this.selectedFile = null;
      this.previewUrl = null; // Limpia la vista previa si no hay archivo seleccionado
    }
  }

  getImageUrl(filename: string): string {
    return `http://localhost:8081/files/${filename}`;
  }



  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('actividad', JSON.stringify(this.actividad));
    if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.http.put(`http://localhost:8081/api/actividades/${this.actividad.id}`, formData).subscribe({
        next: (response) => {
            console.log('Actividad actualizada:', response);
            this.router.navigate(['/actividades']);
        },
        error: (error: HttpErrorResponse) => {
            console.error('Error updating activity:', error);
            alert(`Error updating activity: ${error.message}`);
        }
    });
}

}
