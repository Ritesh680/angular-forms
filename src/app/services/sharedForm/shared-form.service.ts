import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedFormService {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({});
  }

  setForm(form: FormGroup) {
    this.form = form;
  }

  getForm(): FormGroup {
    return this.form;
  }
}
