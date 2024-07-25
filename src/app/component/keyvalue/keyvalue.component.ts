import { Component, Input } from '@angular/core';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isDefinedValue } from '../../utils/functions';

@Component({
  selector: 'app-keyvalue',
  standalone: true,
  imports: [ErrorMessageComponent, CommonModule],
  templateUrl: './keyvalue.component.html',
  styleUrl: './keyvalue.component.css',
})
export class KeyvalueComponent {
  @Input() key = '';
  @Input() value = '';
  @Input() errorMessage?: ValidationErrors;

  hasError(): boolean {
    return isDefinedValue(this.errorMessage);
  }

  getErrorMessage(): string {
    const type = Object.values(this.errorMessage!)[0];
    switch (type) {
      case 'required':
        return 'kei ta lekh gandu';

      case 'minlength':
        console.log({ type });
        return 'ajhai lamo lekh';
      default:
        return '';
    }
  }
}
