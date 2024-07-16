import { Component, Input, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FIELD_TYPES, MODULES, sectionFields, sections } from '@constants';
import { DropdownProps } from '@interfaces';
import { InputfieldComponent } from '@components/inputfield/inputfield.component';
import { ButtonComponent } from '@components/button/button.component';
import { CheckboxComponent } from '@components/checkbox/checkbox.component';
import { SpinningLoaderComponent } from '@components/spinning-loader/spinning-loader.component';
import { EditableTableComponent } from '@components/editable-table/editable-table.component';
import { SelectComponent } from '@components/select/select.component';

import { CardComponent } from '@components/card/card.component';
import { LabelComponent } from '../../component/label/label.component';
import { CommonModule } from '@angular/common';

import { TextareaComponent } from '@components/textarea/textarea.component';
import { TableInputFieldComponent } from '@components/table-input-field/table-input-field.component';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputfieldComponent,
    ButtonComponent,
    CheckboxComponent,
    SpinningLoaderComponent,
    EditableTableComponent,
    SelectComponent,
    CardComponent,
    LabelComponent,
    TextareaComponent,
    TableInputFieldComponent,
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent implements OnInit {
  @Input({ required: true }) moduleName: 'privacy' | 'general' | 'preference' =
    'general';

  modules: DropdownProps[] = [];
  fieldTypes: DropdownProps[] = FIELD_TYPES.map((field) => ({
    label: field,
    value: field.toLowerCase(),
  }));
  options = [{ label: 'Ritesh', value: 'Value' }];

  form: FormGroup;

  isModalOpen: boolean = false;
  modalId: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.moduleGroup;
  }

  get name(): AbstractControl {
    return this.form.get('module') as AbstractControl;
  }

  get sectionGroup() {
    return new FormGroup({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      title: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      subsections: this.fb.control(''),
      showCondition: this.fb.control(''),
      fields: this.fb.array([]),
    });
  }

  get moduleGroup() {
    return new FormGroup({
      module: this.fb.control('', [Validators.required]),
      sections: this.fb.array([this.sectionGroup]),
    });
  }

  get moduleArray() {
    console.log({ this: this.form.get('modules') });
    return this.form.get('modules') as FormArray;
  }

  getSectionArray(module: AbstractControl) {
    return module.get('sections') as FormArray;
  }

  get sectionArray() {
    return this.form.get('sections') as FormArray;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalId = '';
  }

  fieldsTableHeaders = sectionFields.map((field) => {
    return {
      headerLabel: field.label,
      key: field.value,
      inputType: field.type,
      selectOptions: 'selectOptions' in field ? field.selectOptions : [],
    };
  });

  sectionTableHeaders = sections.map((section) => {
    return {
      headerLabel: section.label,
      key: section.value,
      inputType: section.type,
      selectOptions: 'selectOptions' in section ? section.selectOptions : [],
    };
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log({ module: this.form.value });
  }

  addModule() {
    return this.moduleArray.push(this.moduleGroup);
  }

  addSection() {
    this.sectionArray.push(
      this.fb.group({
        name: '',
        title: '',
        description: '',
        type: '',
        subsections: '',
        showCondition: '',
        fields: this.fb.array([]),
      })
    );
  }

  ngOnInit(): void {
    this.modules = MODULES.map((module) => ({
      label: module,
      value: module.toLowerCase(),
    }));
  }
}
