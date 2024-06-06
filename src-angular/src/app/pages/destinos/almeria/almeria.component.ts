import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../../models/actividad.model';
import { DestinoService } from '../../../services/destino.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../Components/button/button.component';
import { SelectComponent } from '../../../Components/select/select.component';

@Component({
  selector: 'app-almeria',
  standalone: true,
  imports: [SelectComponent, FormsModule, ButtonComponent, CommonModule],
  templateUrl: './almeria.component.html',
  styleUrls: ['./almeria.component.scss']
})
export class AlmeriaComponent implements OnInit {
  actividades: Actividad[] = [];
  nombreDestino: string = '';

  constructor(private destinoService: DestinoService) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    const destinoId = 1;
    this.destinoService.getDestinoById(destinoId).subscribe({
      next: (destino) => {
        this.nombreDestino = destino.nombre;
        this.destinoService.getActividadesByDestinoId(destinoId).subscribe({
          next: (data: Actividad[]) => {
            console.log('Actividades cargadas:', data); // Verificar que se cargan las actividades
            this.actividades = data;
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
}
