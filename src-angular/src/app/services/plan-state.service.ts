// src/app/services/plan-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Actividad } from '../models/actividad.model';

@Injectable({
  providedIn: 'root'
})
export class PlanStateService {
  private actividadesSubject = new BehaviorSubject<Actividad[]>([]);
  actividades$ = this.actividadesSubject.asObservable();

  setActividades(actividades: Actividad[]): void {
    this.actividadesSubject.next(actividades);
  }

  getActividades(): Actividad[] {
    return this.actividadesSubject.getValue();
  }
}
