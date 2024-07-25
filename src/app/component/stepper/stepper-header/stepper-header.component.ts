import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TabContentDirective } from '../../../directives/tabContent/tab-content.directive';

@Component({
  selector: 'app-stepper-header',
  standalone: true,
  imports: [CommonModule, TabContentDirective],
  templateUrl: './stepper-header.component.html',
  styleUrl: './stepper-header.component.css',
})
export class StepperHeaderComponent {
  @Input() title: string = '';
  @Input() active: boolean = false;
  @Input() isCompleted: boolean = false;
  @Input() showFooter: boolean = false;
  @Input() footerClass: string = '';
}
