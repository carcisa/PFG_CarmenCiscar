import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Actividad, Categoria } from '../../../models/actividad.model';
import { DestinoService } from '../../../services/destino.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../Components/button/button.component';
import { SelectComponent } from '../../../Components/select/select.component';
import { SearchComponent } from '../../../Components/search/search.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-almeria',
  standalone: true,
  imports: [SelectComponent, FormsModule, ButtonComponent, CommonModule, SearchComponent],
  templateUrl: './almeria.component.html',
  styleUrls: ['./almeria.component.scss']
})
export class AlmeriaComponent implements OnInit, AfterViewInit {

  @Input() options: { value: string, label: string }[] = [
    { value: 'OCIO', label: 'OCIO' },
    { value: 'NATURALEZA', label: 'NATURALEZA' },
    { value: 'GASTRONOMIA', label: 'GASTRONOMÍA' },
    { value: 'DEPORTE', label: 'DEPORTE' },
    { value: 'CULTURA', label: 'CULTURA' }
  ];

  @Input() selectedCategoria: string = '';

  @ViewChild('searchInput') searchInput!: SearchComponent;

  actividades: Actividad[] = [];
  nombreDestino: string = '';
  filteredActividades: Actividad[] = [];
  searchSuggestions: Actividad[] = [];
  categorias = Object.values(Categoria);
  searchQuery: string = '';

  constructor(private destinoService: DestinoService, private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  ngAfterViewInit(): void {

  }


  cargarActividades(): void {
    const destinoId = 1;
    this.destinoService.getDestinoById(destinoId).subscribe({
      next: (destino) => {
        this.nombreDestino = destino.nombre;
        this.destinoService.getActividadesByDestinoId(destinoId).subscribe({
          next: (data: Actividad[]) => {
            this.actividades = data;
            this.filteredActividades = data;
          },
          error: (err) => {
            console.error('Error al cargar actividades', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar el destino', err);
      }
    });
  }

  verDetalleActividad(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/actividad', id]);
    } else {
      console.error('ID de actividad no está definido');
    }
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.filteredActividades = this.actividades.filter(actividad =>
      actividad.nombre.toLowerCase().includes(query.toLowerCase()) &&
      (this.selectedCategoria ? actividad.categoria === this.selectedCategoria : true)
    );

    this.searchSuggestions = query ? this.filteredActividades : [];
  }

  selectSuggestion(suggestion: Actividad): void {
    this.searchSuggestions = [];
    this.filteredActividades = [suggestion];
  }

  onCategoriaChange(categoria: string): void {
    this.selectedCategoria = categoria;
    this.filteredActividades = this.actividades.filter(actividad =>
      (this.selectedCategoria ? actividad.categoria === this.selectedCategoria : true) &&
      actividad.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getCategoriaOptions() {
    return this.options;
  }

  goBack(): void {
    if (this.searchQuery || this.selectedCategoria) {
      // Resetear filtros y búsquedas
      this.searchQuery = '';
      this.selectedCategoria = '';
      this.filteredActividades = this.actividades;
      this.searchSuggestions = [];

      // Limpiar el campo de búsqueda
      this.searchInput.searchQuery = '';
      this.searchInput.onInputChange();
    } else {
      // Navegar a la página anterior
      this.location.back();
    }
  }
}
