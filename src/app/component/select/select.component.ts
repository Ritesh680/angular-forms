import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LabelComponent } from '../label/label.component';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '@components/error-message/error-message.component';

interface DropdownProps {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    LabelComponent,
    CommonModule,
    ErrorMessageComponent,
  ],
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
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() defaultValue: DropdownProps['value'] | undefined;
  @Input() label: string = '';
  @Input() options: DropdownProps[] = [];
  @Input() extraStyles?: string;
  @Input() searchable: boolean = false;
  @Input() isTableSelect: boolean = false;
  @Input() disabled: boolean = false;
  @Input() formControlName: string = '';

  get id(): string {
    return this.label?.toLowerCase().replace(' ', '-') ?? 'select-field';
  }

  value: DropdownProps['value'];

  constructor(private controlContainer: ControlContainer) {
    this.value = this.defaultValue ? this.defaultValue : this.options[0]?.value;
  }

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
    this.onChange(selectedOption.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  shouldShowError(): boolean {
    const control = this.controlContainer.control?.get(this.formControlName);
    return (control?.invalid && (control?.touched || control?.dirty)) ?? false;
  }

  get errors() {
    const control = this.controlContainer.control?.get(this.formControlName);
    return control?.errors;
  }

  ngOnInit(): void {
    const formGroup = this.controlContainer?.control as FormGroup;

    formGroup.get(this.formControlName)?.setValue(this.defaultValue);
  }
}
