import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss'],
})
export class TabContentComponent {
  @Input() tabTitle: string = '';
}
