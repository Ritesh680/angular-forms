import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input({ required: true }) isVisible: boolean = false;
  @Input({ required: true }) modalId: string = '';
  @Input() modalHeader: string | undefined;
  @Input() size: 'sm' | 'xl' | 'lg' = 'lg';

  @Output() confirm: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() cancel: EventEmitter<Event> = new EventEmitter<Event>();

  onCancel(event: Event): void {
    this.cancel.emit(event);
  }

  onConfirm(event: Event): void {
    this.confirm.emit(event);
  }
}
