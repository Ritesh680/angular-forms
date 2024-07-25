import { Component, Input } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getLabelId } from '../../utils/functions';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-inputfield',
  standalone: true,
  imports: [LabelComponent, CommonModule, ErrorMessageComponent],
  templateUrl: './inputfield.component.html',
  styleUrl: './inputfield.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputfieldComponent,
      multi: true,
    },
  ],
})
export class InputfieldComponent implements ControlValueAccessor {
  @Input() label: string | undefined;
  @Input() extraClasses?: string = '';
  @Input({ required: true }) formControlName!: string;

  value: string = '';

  constructor(private controlContainer: ControlContainer) {}

  onChange = (value: string) => {
    const _val = value;
  };

  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  get id(): string {
    return this.label?.toLowerCase().replace(' ', '-') ?? 'input-field';
  }

  addActiveAttribute() {
    const myInput = document.getElementById(this.id);
    const label = document.getElementById(getLabelId(this.id));
    label?.classList.add('active');

    if (myInput) myInput.classList.add('active');
  }

  removeActiveAttribute() {
    if (this.value) return;
    const myInput = document.getElementById(this.id);
    if (myInput) myInput.classList.remove('active');
    const label = document.getElementById(getLabelId(this.id));
    label?.classList.remove('active');
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
    this.removeActiveAttribute();
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
    return this.isFormDirty() && this.isFormInvalid();
  }

  get errors() {
    return this.formControl?.errors;
  }
}
