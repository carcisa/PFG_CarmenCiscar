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
  @Input() options: Array<{ value: string, label: string }> = [];
  @Input() defaultOptionLabel: string = 'Categoría';
  @Input() defaultOptionValue: string = '';

  @Output() selectedValueChange = new EventEmitter<string>();

  private _selectedValue: string | undefined = undefined;

  onChange: any = () => {};
  onTouched: any = () => {};

  get selectedValue(): string | undefined {
    return this._selectedValue;
  }

  set selectedValue(val: string | undefined) {
    this._selectedValue = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.selectedValue = value !== undefined ? value : this.defaultOptionValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectChange(value: string): void {
    this.selectedValue = value;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
