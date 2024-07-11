import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getLabelId } from '../../utils/functions';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.css',
})
export class LabelComponent {
  @Input() label: string = '';
  @Input() htmlFor: string = '';
  @Input() extraStyles: string = '';

  get labelFor(): string {
    return this.htmlFor;
  }

  get labelId(): string {
    return getLabelId(this.htmlFor);
  }
}
