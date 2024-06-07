import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
  selector: 'app-huelva',
  standalone: true,
  imports: [SelectComponent, FormsModule, ButtonComponent, CommonModule, SearchComponent],
  templateUrl: './huelva.component.html',
  styleUrls: ['./huelva.component.scss']
})
export class HuelvaComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: SearchComponent;

  actividades: Actividad[] = [];
  nombreDestino: string = '';
  filteredActividades: Actividad[] = [];
  categorias = Object.values(Categoria).map(categoria => ({ value: categoria, label: categoria }));
  selectedCategoria: string | undefined = undefined;
  searchQuery: string = '';

  constructor(private destinoService: DestinoService, private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  ngAfterViewInit(): void {
    // Ahora searchInput está inicializado
  }

  cargarActividades(): void {
    const destinoId = 5;  // ID para Huelva
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
