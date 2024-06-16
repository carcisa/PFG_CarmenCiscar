import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [FormsModule, ButtonComponent, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: Array<{ value: string, label: string }> = []; // Opciones del select
  @Input() defaultOptionLabel: string = 'Categoría'; // Etiqueta por defecto
  @Input() defaultOptionValue: string = ''; // Valor por defecto

  @Output() selectedValueChange = new EventEmitter<string>(); // Emite cambios en la selección

  private _selectedValue: string | undefined = undefined;

  onChange: any = () => {};
  onTouched: any = () => {};

  get selectedValue(): string | undefined {
    return this._selectedValue;
  }

  set selectedValue(val: string | undefined) {
    this._selectedValue = val;
    this.onChange(val); // Notificar cambio de valor
    this.onTouched(); // Marcar como tocado
  }

  writeValue(value: any): void {
    this.selectedValue = value !== undefined ? value : this.defaultOptionValue; // Establecer valor
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;// Registrar función de cambio
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;// Registrar función de toque
  }

  onSelectChange(value: string): void {
    this.selectedValue = value;
    this.selectedValueChange.emit(this.selectedValue);// Emitir cambio de selección
  }
}
