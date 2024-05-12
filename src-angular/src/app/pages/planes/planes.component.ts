import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from '../../models/actividad.model';
import { DestinoService } from '../../services/destino.service';
import { CommonModule } from '@angular/common';
import { Destino } from '../../models/destino.model';
import { ButtonComponent } from '../../Components/button/button.component';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {
  destinos: Destino[] = [];

  constructor(private destinoService: DestinoService) { }

  ngOnInit(): void {
    this.destinoService.getAllDestinos().subscribe({
      next: (destinos) => this.destinos = destinos,
      error: (err) => console.error('Error fetching destinos:', err)
    });
  }
}
