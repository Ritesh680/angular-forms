import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-table-input-field',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent],
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
  @Input({ required: true }) formControlName!: string;
  constructor(private controlContainer: ControlContainer) {}
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

  get formControl() {
    return this.controlContainer.control?.get(this.formControlName);
  }
  isFormDirty() {
    return (this.formControl?.touched || this.formControl?.dirty) ?? false;
  }

  isFormInvalid() {
    return this.formControl?.invalid ?? false;
  }

  isFormValid() {
    return this.formControl?.value ? this.formControl?.valid ?? false : false;
  }
  shouldShowError(): boolean {
    return (
      (this.formControl?.invalid &&
        (this.formControl?.touched || this.formControl?.dirty)) ??
      false
    );
  }

  get errors() {
    console.log({ here: '' });
    return this.formControl?.errors;
  }
}
