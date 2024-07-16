import { Component } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { TabsComponent } from '@components/tabs/tabs.component';
import { TabComponent } from '@components/tabs/tab/tab.component';
import { TabContentComponent } from '@components/tabs/tab-content/tab-content.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    TemplateComponent,
    TabsComponent,
    TabComponent,
    TabContentComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  tabs = [
    { label: 'General', tabIndex: 0 },
    { label: 'Preference', tabIndex: 1 },
  ];
}
