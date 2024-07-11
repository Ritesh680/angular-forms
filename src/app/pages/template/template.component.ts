import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FIELD_TYPES, MODULES, sectionFields, sections } from '@constants';
import { DropdownProps, EditableTableHeader } from '@interfaces';
import { InputfieldComponent } from '@components/inputfield/inputfield.component';
import { ButtonComponent } from '@components/button/button.component';
import { CheckboxComponent } from '@components/checkbox/checkbox.component';
import { SpinningLoaderComponent } from '@components/spinning-loader/spinning-loader.component';
import { EditableTableComponent } from '@components/editable-table/editable-table.component';
import { SelectComponent } from '@components/select/select.component';
import { SectionFieldTypes } from './template.interface';
import { CardComponent } from '@components/card/card.component';
import { LabelComponent } from '../../component/label/label.component';
import { CommonModule } from '@angular/common';
import { INPUT_FIELD_TYPES } from '../../@types/enums';
import { ModalComponent } from '@components/modal/modal.component';
import { TextareaComponent } from '@components/textarea/textarea.component';
import { TableInputFieldComponent } from '@components/table-input-field/table-input-field.component';

interface IObject {
  [x: string]: FormControl<string | null>;
}

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
    ModalComponent,
    TextareaComponent,
    TableInputFieldComponent,
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent implements OnInit {
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
    this.form = this.fb.group({
      module: '',
      sections: this.fb.array([
        this.fb.group({
          name: '',
          title: '',
          description: '',
          type: '',
          subsections: '',
          showCondition: '',
          fields: this.fb.array([]),
        }),
      ]),
    });
  }

  get sectionArray() {
    return this.form.get('sections') as FormArray;
  }

  getSectionFields = () => {
    const obj: IObject = {};
    sectionFields.map((field) => (obj[field.value] = new FormControl('')));
    return obj;
  };

  getSectionFieldsTableHeaders(tableHeaders: SectionFieldTypes[]) {
    return tableHeaders.map((header) => ({
      headerLabel: header.label,
      key: header.value,
      inputType: header.type,
      selectOptions: 'selectOptions' in header ? header.selectOptions : [],
    }));
  }

  get showModalFor(): EditableTableHeader['key'][] {
    const showModalsFor: EditableTableHeader['key'][] = [];
    this.fieldsTableHeaders.forEach((header) =>
      header.inputType === INPUT_FIELD_TYPES.TEXTAREA ||
      (header.inputType === INPUT_FIELD_TYPES.SELECT &&
        header.selectOptions?.length === 0)
        ? showModalsFor.push(header.key)
        : null
    );

    return showModalsFor;
  }

  isModalOpenFor(index: number, modalId: string): boolean {
    return this.isModalOpen && this.modalId === `fields.${index}.${modalId}`;
  }

  openModal(index: number, modalId: string) {
    this.isModalOpen = true;
    this.modalId = `fields.${index}.${modalId}`;
  }
  setDefaultValueOnModalCancel() {
    //
  }
  handleModalCancel() {
    this.setDefaultValueOnModalCancel();
    this.closeModal();
  }

  getFields(section: AbstractControl) {
    return section.get('fields') as FormArray;
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
    console.log({ module: this.form.value });
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

    this.addRow(this.sectionArray.length - 1);
  }

  addRow(i: number) {
    const newRow = this.fb.group(this.getSectionFields());
    const fields = this.sectionArray.at(i).get('fields') as FormArray;
    fields.push(newRow);
  }

  deleteRow(i: number, index: number) {
    const fields = this.sectionArray.at(i).get('fields') as FormArray;
    fields.removeAt(index);
  }

  ngOnInit(): void {
    this.modules = MODULES.map((module) => ({
      label: module,
      value: module.toLowerCase(),
    }));

    if (this.sectionArray.value[0].fields?.length === 0) {
      this.addRow(0);
    }
  }
}
