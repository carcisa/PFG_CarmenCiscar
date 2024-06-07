import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Actividad, Categoria } from '../../../models/actividad.model';
import { DestinoService } from '../../../services/destino.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../Components/button/button.component';
import { SelectComponent } from '../../../Components/select/select.component';
import { SearchComponent } from '../../../Components/search/search.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-almeria',
  standalone: true,
  imports: [SelectComponent, FormsModule, ButtonComponent, CommonModule, SearchComponent],
  templateUrl: './almeria.component.html',
  styleUrls: ['./almeria.component.scss']
})
export class AlmeriaComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: SearchComponent;

  actividades: Actividad[] = [];
  nombreDestino: string = '';
  filteredActividades: Actividad[] = [];
  categorias = Object.values(Categoria);
  selectedCategoria: string = '';
  searchQuery: string = '';

  constructor(private destinoService: DestinoService, private location: Location) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  ngAfterViewInit(): void {
    // Ahora searchInput está inicializado
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

  onSearch(query: string): void {
    this.searchQuery = query;
    this.filteredActividades = this.actividades.filter(actividad =>
      actividad.nombre.toLowerCase().includes(query.toLowerCase()) &&
      (this.selectedCategoria ? actividad.categoria === this.selectedCategoria : true)
    );
  }

  onCategoriaChange(categoria: string): void {
    this.selectedCategoria = categoria;
    this.filteredActividades = this.actividades.filter(actividad =>
      (this.selectedCategoria ? actividad.categoria === this.selectedCategoria : true) &&
      actividad.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getCategoriaOptions() {
    return this.categorias.map(categoria => ({ value: categoria, label: categoria }));
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
      this.location.back();
    }
  }
}
