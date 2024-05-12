import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SelectComponent } from '../../Components/select/select.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../Components/button/button.component';
import { CommonModule } from '@angular/common';
import { Actividad } from '../../models/actividad.model';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [SelectComponent,FormsModule, ButtonComponent, CommonModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.scss'
})
export class ActividadesComponent implements OnInit{

  actividades: Actividad[] = [];

  @Input() options: { value: string, label: string }[] = [
    { value: '', label: 'CATEGORÍAS' },
    { value: '1', label: 'OCIO' },
    { value: '2', label: 'NATURALEZA' },
    { value: '3', label: 'GASTRONOMÍA' },
    { value: '4', label: 'DEPORTE' },
    { value: '5', label: 'CULTURA' }
  ];

  @Input() selectedValue: string = '';

  @Output() selectedValueChange = new EventEmitter<string>();

  onChange(value: string) {
    this.selectedValueChange.emit(value);
  }

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.loadActividades();
  }

  loadActividades(): void {
    this.actividadService.getAllActividades().subscribe({
      next: (data) => {
        this.actividades = data;
      },
      error: (error) => {
        console.error('Error al cargar las actividades:', error);
      }
    });
  }
}

