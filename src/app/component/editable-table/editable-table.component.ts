import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';
import { CheckboxComponent } from '@components/checkbox/checkbox.component';
import { ModalComponent } from '@components/modal/modal.component';
import { SelectComponent } from '@components/select/select.component';
import { TableInputFieldComponent } from '@components/table-input-field/table-input-field.component';
import { EditableTableHeader } from '@interfaces';
import { INPUT_FIELD_TYPES } from '../../@types/enums';
import { TextareaComponent } from '@components/textarea/textarea.component';

@Component({
  selector: 'app-editable-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TableInputFieldComponent,
    CheckboxComponent,
    ModalComponent,
    SelectComponent,
    ButtonComponent,
    TextareaComponent,
  ],
  templateUrl: './editable-table.component.html',
  styleUrl: './editable-table.component.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(FormGroupDirective),
    },
  ],
})
export class EditableTableComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Headers configuration for the editable table
   * @note
   * Action column should not be added in the tableHeaders
   * @type {EditableTableHeader[]}
   */
  @Input({ required: true }) tableHeaders!: EditableTableHeader[];

  /**
   * If the table should not have serial number column
   */
  @Input() noSN = false;

  /**
   * Form group for the section containing the table
   */
  @Input() section!: AbstractControl;

  /**
   * Name of the section containing the table
   */
  @Input() sectionName!: string;

  /**
   * If the table is nested inside form group then set this to true
   */
  @Input() isNested = false;

  /**
   * Name of the table
   */
  @Input({ required: true }) name!: string;

  isModalOpen = false;
  modalId = '';

  constructor(private controlContainer: ControlContainer) {}

  get tableForm() {
    return this.controlContainer?.control as FormGroup;
  }

  get formGroup() {
    return this.section as FormGroup;
  }

  get rowsArray() {
    if (this.isNested) {
      return this.section.get(this.name) as FormArray;
    }
    return this.tableForm?.get(this.name) as FormArray;
  }

  get allFields() {
    const fields = this.section?.get(this.name) as FormArray;
    return fields.controls;
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

  addRow() {
    const newRow = this.getSectionFields();

    this.rowsArray?.push(newRow);
  }

  deleteRow(index: number) {
    this.rowsArray.removeAt(index);
  }

  getSectionFields() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      title: new FormControl(''),
      subtitle: new FormControl(''),
      showCondition: new FormControl(''),
      value: new FormControl(''),
      valueFn: new FormControl(''),
      type: new FormControl(''),
      description: new FormControl(''),
      placeholder: new FormControl(''),
      mandatory: new FormControl(false),
      readonly: new FormControl(false),
      hidden: new FormControl(false),
      format: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.isNested && (!this.section || !this.sectionName)) {
      throw new Error(
        'section and sectionName is required when isNested is true'
      );
    }

    const fieldGroup = this.getSectionFields();

    if (this.isNested) {
      const sectionsArray = this.tableForm.get(this.sectionName) as FormArray;
      console.log({ sectionsArray });

      if (sectionsArray) {
        const sectionIndex = sectionsArray.controls.findIndex(
          (section) => section === this.section
        );

        if (sectionIndex !== -1) {
          const sectionGroup = sectionsArray.at(sectionIndex) as FormGroup;
          const fieldsArray = sectionGroup.get('fields') as FormArray;

          if (fieldsArray) {
            fieldsArray.push(fieldGroup);
          } else {
            throw new Error(
              `Fields array not found in section "${this.section}".`
            );
          }
        } else {
          throw new Error(`Section "${this.section}" not found.`);
        }
      } else {
        throw new Error(`Nested form array "${this.section}" not found.`);
      }
      return;
    } else {
      this.tableForm.addControl(this.name, new FormArray([fieldGroup]));
    }
  }

  ngOnDestroy(): void {
    if (this.isNested) {
      const nested = this.section as FormGroup;
      nested.removeControl(this.name);
    } else {
      this.tableForm.removeControl(this.name);
    }
  }
}
