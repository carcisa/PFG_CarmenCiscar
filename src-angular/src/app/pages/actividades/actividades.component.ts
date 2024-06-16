import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { SelectComponent } from '../../Components/select/select.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../Components/button/button.component';
import { CommonModule } from '@angular/common';
import { Actividad } from '../../models/actividad.model';
import { ActividadService } from '../../services/actividad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from '../../Components/search/search.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/usuario.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [SelectComponent, FormsModule, ButtonComponent, CommonModule, SearchComponent],
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {

  actividades: Actividad[] = [];
  filteredActividades: Actividad[] = [];
  nombreDestino: string = '';

  @Input() options: { value: string, label: string }[] = [
    { value: 'OCIO', label: 'OCIO' },
    { value: 'NATURALEZA', label: 'NATURALEZA' },
    { value: 'GASTRONOMIA', label: 'GASTRONOMÍA' },
    { value: 'DEPORTE', label: 'DEPORTE' },
    { value: 'CULTURA', label: 'CULTURA' }
  ];

  @Input() selectedCategoria: string = '';

   // Emite cambios en la categoría seleccionada
  @Output() selectedCategoriaChange = new EventEmitter<string>();

  searchQuery: string = '';

  @ViewChild('searchInput') searchInput!: SearchComponent;

  constructor(private actividadService: ActividadService, private router: Router) {}

  ngOnInit(): void {
    this.loadActividades();
  }

  loadActividades(): void {
    // Cargar todas las actividades desde el servicio
    this.actividadService.getAllActividades().subscribe({
      next: (data) => {
        this.actividades = data;
         // Inicialmente, todas las actividades están filtradas
        this.filteredActividades = data;
      },
      error: (error) => {
        console.error('Error al cargar las actividades:', error);
      }
    });
  }

  getImagenUrl(imagen: string): string {
    return `${imagen}`;
  }

  verDetalleActividad(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/actividad', id]);
    } else {
      console.error('ID de actividad no está definido');
    }
  }

  onSearch(query: string): void {
    this.searchQuery = query; // Actualizar la consulta de búsqueda
    this.filterActividades(); // Filtrar actividades según la consulta
  }

  onCategoriaChange(categoria: string): void {
    this.selectedCategoria = categoria; // Actualizar la categoría seleccionada
    this.filterActividades(); // Filtrar actividades según la categoría
  }

  filterActividades(): void {
    this.filteredActividades = this.actividades.filter(actividad =>
      actividad.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedCategoria ? actividad.categoria === this.selectedCategoria : true)
    );
  }

  getCategoriaOptions() {
    return this.options; // Obtener opciones de categorías
  }

  goBack(): void {
    if (this.searchQuery || this.selectedCategoria) {
      // Resetear filtros y búsquedas
      this.searchQuery = '';
      this.selectedCategoria = '';
      this.filteredActividades = this.actividades;

      // Limpiar el campo de búsqueda
      if (this.searchInput) {
        this.searchInput.searchQuery = '';
        this.searchInput.onInputChange();
      }
    } else {
      // Navegar a la página anterior
      this.router.navigate(['/']);
    }
  }
}
