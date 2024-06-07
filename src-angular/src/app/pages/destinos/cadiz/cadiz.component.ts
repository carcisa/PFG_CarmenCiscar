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
  selector: 'app-cadiz',
  standalone: true,
  imports: [SelectComponent, FormsModule, ButtonComponent, CommonModule, SearchComponent],
  templateUrl: './cadiz.component.html',
  styleUrls: ['./cadiz.component.scss']
})
export class CadizComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: SearchComponent;

  actividades: Actividad[] = [];
  nombreDestino: string = '';
  filteredActividades: Actividad[] = [];
  categorias = Object.values(Categoria).map(categoria => ({ value: categoria, label: categoria }));
  selectedCategoria: string | undefined = undefined;
  searchQuery: string = '';

  constructor(private destinoService: DestinoService, private location: Location) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  ngAfterViewInit(): void {
    // Ahora searchInput está inicializado
  }

  cargarActividades(): void {
    const destinoId = 2;  // ID para Cádiz
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
    return this.categorias;
  }

  goBack(): void {
    if (this.searchQuery || this.selectedCategoria) {
      // Resetear filtros y búsquedas
      this.searchQuery = '';
      this.selectedCategoria = undefined;
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
