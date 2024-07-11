import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [LabelComponent, CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() label: string | undefined;

  value: boolean = false;

  onChange = (value: boolean) => {
    this.value = value;
  };
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChange(input.checked);
  }

  handleInputChange(value: boolean): void {
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }
  ngOnInit(): void {
    this.handleInputChange(true);
  }
}
