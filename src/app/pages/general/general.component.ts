import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { AccordionComponent } from '../../component/accordion/accordion.component';
import { CalloutComponent } from '../../component/callout/callout.component';
import { CardComponent } from '../../component/card/card.component';
import { ButtonComponent } from '../../component/button/button.component';
import { KeyvalueComponent } from '../../component/keyvalue/keyvalue.component';
import { CommonModule } from '@angular/common';
import { TabContentDirective } from '../../directives/tabContent/tab-content.directive';
import { ModalComponent } from '@components/modal/modal.component';
import { InputfieldComponent } from '../../component/inputfield/inputfield.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Module } from '@interfaces';
import { SharedFormService } from '../../services/sharedForm/shared-form.service';
import { FormErrorsService } from '../../services/sharedForm/form-errors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    AccordionComponent,
    CalloutComponent,
    CardComponent,
    ButtonComponent,
    KeyvalueComponent,
    ModalComponent,
    TabContentDirective,
    ReactiveFormsModule,
    InputfieldComponent,
  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css',
})
export class GeneralComponent implements OnInit, OnDestroy, OnChanges {
  modalDetails: (typeof this.sidebarItems)[0] | null = null;
  form: FormGroup = new FormGroup({});
  sidebarItems: { label: string; id: string }[] = [];
  errors: ValidationErrors[] = [];

  private subs: Subscription;

  @Input({ required: true }) module: Module | undefined;

  setModalDetails(section: (typeof this.sidebarItems)[0] | null): void {
    if (!section) {
      this.modalDetails = null;
      return;
    }
    this.modalDetails = {
      label: section.label,
      id: section.id,
    };
  }
  constructor(
    private sharedFormService: SharedFormService,
    private formErrors: FormErrorsService
  ) {
    this.form = this.sharedFormService.getForm();
    this.subs = this.formErrors.changeEmitter.subscribe((data) => {
      this.errors = data;
    });
  }

  getError(name: string): ValidationErrors | undefined {
    const errorIndex = this.errors.findIndex((error) =>
      Object.keys(error).find((err) => err === name)
    );

    if (errorIndex !== -1) return this.errors[errorIndex];

    return;
  }
  confirmForm(): void {
    this.form.markAllAsTouched();
    const isValid = this.form.valid;
    if (isValid) {
      this.setModalDetails(null);
    }
  }

  cancelModal(): void {
    const id = this.modalDetails?.id;
    const inputFieldId = this.module?.sections?.[0]?.fields.filter(
      (field) => field.subsection === id
    );

    inputFieldId?.forEach((field) => {
      this.form.get(field.name)?.reset();
    });
    this.setModalDetails(null);
  }

  setFormControl(): void {
    this.module?.sections?.[0]?.fields.forEach((field) => {
      this.form.addControl(
        field.name,
        new FormControl(
          '',
          field.mandatory
            ? [Validators.required, Validators.minLength(20)]
            : null
        )
      );
    });
    this.sharedFormService.setForm(this.form);
  }

  setSidebarList() {
    const list: { label: string; id: string }[] = [];
    this.module?.sections.forEach((section) =>
      list.push({ label: section.title, id: section.name })
    );
    this.sidebarItems = list;
  }

  getValueById(id: string): string {
    return this.form.get(id)?.value;
  }

  ngOnInit(): void {
    console.log('GeneralComponent initialized');
    this.setSidebarList();
    this.setFormControl();
  }

  ngOnDestroy(): void {
    console.log('GeneralComponent destroyed');
    this.subs.unsubscribe();
  }

  ngOnChanges(): void {
    console.log('GeneralComponent changed');
  }
}
