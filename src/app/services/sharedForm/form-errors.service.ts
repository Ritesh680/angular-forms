import { ChangeDetectorRef, EventEmitter, Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorsService {
  errors: ValidationErrors[] = [];
  changeEmitter = new EventEmitter();
  private cd?: ChangeDetectorRef;

  triggerChange(data: ValidationErrors[]) {
    this.changeEmitter.emit(data);
    this.cd?.detectChanges();
  }
}
