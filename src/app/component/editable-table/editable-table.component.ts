import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { CheckboxComponent } from '@components/checkbox/checkbox.component';
import { InputfieldComponent } from '@components/inputfield/inputfield.component';
import { ModalComponent } from '@components/modal/modal.component';
import { SelectComponent } from '@components/select/select.component';
import { TableInputFieldComponent } from '@components/table-input-field/table-input-field.component';
import { TextareaComponent } from '@components/textarea/textarea.component';
import { EditableTableHeader } from '@interfaces';
import { INPUT_FIELD_TYPES } from '../../@types/enums';

@Component({
  selector: 'app-editable-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputfieldComponent,
    TableInputFieldComponent,
    TextareaComponent,
    ButtonComponent,
    CheckboxComponent,
    SelectComponent,
    ModalComponent,
  ],
  templateUrl: './editable-table.component.html',
  styleUrl: './editable-table.component.css',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class EditableTableComponent implements OnInit {
  @Input() noSN: boolean = false;
  @Input() tableHeaders: EditableTableHeader[] = [];
  @Input({ required: true }) name: string = '';
  @Input() index: number = 0;

  isModalOpen: boolean = false;
  modalId: string = '';

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  get tableForm() {
    return this.controlContainer?.control as FormGroup;
  }

  get rowsArray() {
    return this.tableForm.get(this.name) as FormArray;
  }

  get showModalFor(): EditableTableHeader['key'][] {
    const showModalsFor: EditableTableHeader['key'][] = [];
    this.tableHeaders.forEach((header) =>
      header.inputType === INPUT_FIELD_TYPES.TEXTAREA ||
      (header.inputType === INPUT_FIELD_TYPES.SELECT &&
        header.selectOptions?.length === 0)
        ? showModalsFor.push(header.key)
        : null
    );

    return showModalsFor;
  }

  isModalOpenFor(index: number, modalId: string): boolean {
    return (
      this.isModalOpen && this.modalId === `${this.name}.${index}.${modalId}`
    );
  }

  openModal(index: number, modalId: string) {
    this.isModalOpen = true;
    this.modalId = `${this.name}.${index}.${modalId}`;
  }

  setDefaultValueOnModalCancel() {
    const field = this.tableForm.get(this.modalId) as FormControl;
    field.setValue('');
  }

  handleModalCancel() {
    this.setDefaultValueOnModalCancel();
    this.closeModal();
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalId = '';
  }

  handleModalConfirm() {
    this.closeModal();
  }

  getSectionFields = () => {
    const obj: Record<string, FormControl> = {};
    this.tableHeaders.map(
      (field) =>
        (obj[field.key] = new FormControl(
          field.inputType === INPUT_FIELD_TYPES.CHECKBOX ? false : ''
        ))
    );
    return obj;
  };

  addRow() {
    const newRow = this.fb.group(this.getSectionFields());

    this.rowsArray?.push(newRow);
  }

  deleteRow(index: number) {
    this.rowsArray.removeAt(index);
  }

  ngOnInit(): void {
    if (this.rowsArray?.length === 0) {
      this.addRow();
    }
  }
}
