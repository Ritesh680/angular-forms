import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-stepper-footer',
  standalone: true,
  imports: [],
  templateUrl: './stepper-footer.component.html',
  styleUrl: './stepper-footer.component.css',
})
export class StepperFooterComponent {
  @Output() next: EventEmitter<Event> = new EventEmitter();
  @Output() prev: EventEmitter<Event> = new EventEmitter();
  @Output() save: EventEmitter<Event> = new EventEmitter();

  handleNext(event: Event): void {
    this.next.emit(event);
  }

  handlePrev(event: Event): void {
    this.prev.emit(event);
  }

  handleSave(event: Event): void {
    this.save.emit(event);
  }
}
