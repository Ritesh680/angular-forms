import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LabelComponent } from '../label/label.component';
import { CommonModule } from '@angular/common';

interface DropdownProps {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgSelectModule, FormsModule, LabelComponent, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() defaultValue: DropdownProps['value'] | null = null;
  @Input() label: string = '';
  @Input() options: DropdownProps[] = [];
  @Input() extraStyles?: string;
  @Input() searchable: boolean = false;
  @Input() isTableSelect: boolean = false;

  get id(): string {
    return this.label?.toLowerCase().replace(' ', '-') ?? 'select-field';
  }

  value: DropdownProps['value'] | null = null;

  onChange = (value: DropdownProps['value']) => {
    this.value = value;
  };
  onTouched = () => {};

  writeValue(value: DropdownProps['value']): void {
    this.value = value;
  }

  registerOnChange(fn: (value: DropdownProps['value']) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(selectedOption: DropdownProps): void {
    this.onChange(selectedOption.value as DropdownProps['value']);
  }

  onBlur(): void {
    this.onTouched();
  }
}
