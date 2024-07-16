import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonVariantProps, buttonClasses } from './buttonCVA.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() intent: ButtonVariantProps['intent'];
  @Input() size: ButtonVariantProps['size'];
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Output() buttonClick: EventEmitter<Event> = new EventEmitter<Event>();

  get computedClasses(): string {
    return buttonClasses({
      intent: this.intent,
      size: this.size,
      disabled: this.disabled,
    });
  }

  onClick(event: Event): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
