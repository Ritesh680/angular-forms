import { Component } from '@angular/core';
import { ButtonComponent } from '../../component/button/button.component';
import { CheckboxComponent } from '../../component/checkbox/checkbox.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [ButtonComponent, CheckboxComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {}
