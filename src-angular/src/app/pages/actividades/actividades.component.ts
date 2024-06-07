import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SelectComponent } from '../../Components/select/select.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../Components/button/button.component';
import { CommonModule } from '@angular/common';
import { Actividad } from '../../models/actividad.model';
import { ActividadService } from '../../services/actividad.service';
import { SearchComponent } from '../../Components/search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [SelectComponent, FormsModule, ButtonComponent, CommonModule, SearchComponent],
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: SearchComponent;

  actividades: Actividad[] = [];
  filteredActividades: Actividad[] = [];

  @Input() options: { value: string, label: string }[] = [

    { value: 'OCIO', label: 'OCIO' },
    { value: 'NATURALEZA', label: 'NATURALEZA' },
    { value: 'GASTRONOMIA', label: 'GASTRONOMÍA' },
    { value: 'DEPORTE', label: 'DEPORTE' },
    { value: 'CULTURA', label: 'CULTURA' }
  ];

  @Input() selectedValue: string = '';

  @Output() selectedValueChange = new EventEmitter<string>();
  onChange(value: string) {
    this.selectedValueChange.emit(value);
  }

  searchQuery: string = '';

  constructor(private actividadService: ActividadService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.loadActividades();
  }

  ngAfterViewInit(): void {
    // Ahora searchInput está inicializado
  }

  loadActividades(): void {
    this.actividadService.getAllActividades().subscribe({
      next: (data) => {
        this.actividades = data;
        this.filteredActividades = data;
      },
      error: (error) => {
        console.error('Error al cargar las actividades:', error);
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
    this.filterActividades();
  }

  onCategoriaChange(value: string): void {
    this.selectedValue = value;
    this.filterActividades();
    this.selectedValueChange.emit(value);
  }

  filterActividades(): void {
    this.filteredActividades = this.actividades.filter(actividad =>
      actividad.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedValue ? actividad.categoria === this.selectedValue : true)
    );
  }
}
