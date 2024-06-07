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

  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.search.emit(query);
    });
  }

  onInputChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.search.emit(this.searchQuery);
    }
  }
}
