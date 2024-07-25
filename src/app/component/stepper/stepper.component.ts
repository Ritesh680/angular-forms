import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
} from '@angular/core';
import { StepperHeaderComponent } from './stepper-header/stepper-header.component';

import { StepperFooterComponent } from './stepper-footer/stepper-footer.component';
import { AlertDirective } from '../../directives/alert/alert.directive';
import { CalloutComponent } from '../callout/callout.component';

import { SharedFormService } from '../../services/sharedForm/shared-form.service';
import { ValidationErrors } from '@angular/forms';
import { FormErrorsService } from '../../services/sharedForm/form-errors.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    StepperFooterComponent,
    AlertDirective,
    CalloutComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  @ContentChildren(StepperHeaderComponent)
  tabs: QueryList<StepperHeaderComponent> = QueryList.prototype;

  errors: ValidationErrors[] = [];
  showAlert: boolean = false;

  @Output() handleTabChange: EventEmitter<StepperHeaderComponent> =
    new EventEmitter<StepperHeaderComponent>();

  constructor(
    private sharedFormService: SharedFormService,
    private formErrors: FormErrorsService,
    private cd: ChangeDetectorRef
  ) {}

  get activeTabIndex(): number | null {
    return this.tabs.toArray().findIndex((tab) => tab.active) ?? null;
  }

  get currentTab(): StepperHeaderComponent | null {
    return this.tabs.toArray().find((tab) => tab.active) ?? null;
  }

  selectTab(tab: StepperHeaderComponent) {
    this.handleTabChange.emit(tab);
  }

  getCSS(tab: StepperHeaderComponent): string {
    let className = '';
    if (tab.isCompleted && tab.active) {
      className = 'active confirmed';
    }
    if (tab.isCompleted) {
      className = 'confirmed';
    }
    if (tab.active) {
      className = 'active';
    }
    return className;
  }

  isFormValid(): boolean {
    return this.sharedFormService.getForm().valid;
  }

  setErrors() {
    this.errors = [];
    const form = this.sharedFormService.getForm();
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control?.errors) {
        Object.keys(control.errors).forEach((error) => {
          this.errors.push({ [key]: error });
        });
      }
    });

    this.formErrors.triggerChange(this.errors);
  }

  handleNext() {
    const isValid = this.isFormValid();
    if (!isValid) {
      this.sharedFormService.getForm().markAllAsTouched();
      this.setErrors();

      return;
    }
    const activeTabIndex = this.activeTabIndex;

    if (activeTabIndex === null) return;
    if (activeTabIndex === this.tabs.length - 1) return;
    this.selectTab(this.tabs.toArray()[activeTabIndex + 1]);
  }

  handlePrev() {
    const activeTabIndex = this.activeTabIndex;
    if (activeTabIndex === null) return;
    if (activeTabIndex === 0) return;
    this.selectTab(this.tabs.toArray()[activeTabIndex - 1]);
  }

  handleSave() {
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }
}
