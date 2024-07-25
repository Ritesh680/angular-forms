import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootstrap-modal',
  standalone: true,
  imports: [],
  templateUrl: './bootstrap-modal.component.html',
  styleUrl: './bootstrap-modal.component.css',
})
export class BootstrapModalComponent implements OnInit {
  @Input({ required: true }) modalId: string | undefined;
  @Input() modalTitle: string = '';

  ngOnInit(): void {
    if (!this.modalId) {
      throw new Error('modalId is required');
    }
  }
}
