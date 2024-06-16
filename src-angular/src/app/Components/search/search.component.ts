import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {


  searchQuery: string = '';

  private searchSubject: Subject<string> = new Subject<string>();
  // Subject para manejar los eventos de búsqueda

  @Output() search = new EventEmitter<string>();
  // Emisor de eventos para enviar la consulta de búsqueda

  constructor() {
    // Suscripción al Subject con un tiempo de espera (debounce) para limitar la frecuencia de las emisiones
    this.searchSubject.pipe(
      debounceTime(300)
      // Espera 300 ms después de la última entrada antes de emitir
    ).subscribe(query => {
      this.search.emit(query);
      // Emitir el evento de búsqueda con la consulta
    });
  }

  onInputChange(): void {
    this.searchSubject.next(this.searchQuery);
    // Emitir el valor de la consulta de búsqueda en cada cambio de entrada
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    // Prevenir el comportamiento predeterminado del formulario
    if (this.searchQuery.trim()) {
      // Comprobar que la consulta no esté vacía
      this.search.emit(this.searchQuery);
      // Emitir el evento de búsqueda con la consulta
    }
  }
}
