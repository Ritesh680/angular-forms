import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getLabelId } from '../../utils/functions';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: TextareaComponent, multi: true },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() extraClasses?: string;

  value: string = '';

  onChange = (value: string) => {
    const _val = value;
  };

  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  get id(): string {
    return this.label?.toLowerCase().replace(/ /g, '-') ?? 'textarea';
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
}
