import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-callout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callout.component.html',
  styleUrl: './callout.component.css',
})
export class CalloutComponent {
  @Input() type: 'success' | 'warning' | 'error' | 'note' = 'warning';
  @Input() title: string = 'Titolo di attenzione';

  get calloutType(): string {
    return this.type === 'success'
      ? 'success'
      : this.type === 'warning'
      ? 'warning'
      : this.type === 'note'
      ? 'note'
      : 'danger';
  }
}
