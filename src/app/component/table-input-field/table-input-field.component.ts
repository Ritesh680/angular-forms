import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-table-input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-input-field.component.html',
  styleUrl: './table-input-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableInputFieldComponent),
      multi: true,
    },
  ],
})
export class TableInputFieldComponent implements ControlValueAccessor {
  value: string = '';
  onChange = (value: string) => {
    const _val = value;
  };
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(input.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
