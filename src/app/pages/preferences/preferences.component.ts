import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Module } from '@interfaces';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { CalloutComponent } from '../../component/callout/callout.component';
import { CardComponent } from '../../component/card/card.component';
import { CommonModule } from '@angular/common';
import { InputfieldComponent } from '../../component/inputfield/inputfield.component';

import { StepperFooterComponent } from '../../component/stepper/stepper-footer/stepper-footer.component';
import { SharedFormService } from '../../services/sharedForm/shared-form.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    CalloutComponent,
    CardComponent,
    InputfieldComponent,
    ReactiveFormsModule,
    StepperFooterComponent,
  ],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css',
})
export class PreferencesComponent implements OnInit {
  @Input({ required: true }) module?: Module;
  form: FormGroup = new FormGroup({});
  sidebarItems: { label: string; id: string }[] = [];

  constructor(private sharedFormService: SharedFormService) {
    this.form = this.sharedFormService.getForm();
  }

  setSidebarList() {
    const list: { label: string; id: string }[] = [];
    this.module?.sections.forEach((section) =>
      list.push({ label: section.title, id: section.name })
    );
    this.sidebarItems = list;
  }

  setFormControl(): void {
    this.module?.sections?.[0]?.fields.forEach((field) => {
      this.form.addControl(
        field.name,
        new FormControl('', field.mandatory ? Validators.required : null)
      );
    });
    this.sharedFormService.setForm(this.form);
  }

  ngOnInit(): void {
    this.setSidebarList();
    this.setFormControl();
  }
}
