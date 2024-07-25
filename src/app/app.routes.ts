import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'privacy', component: PrivacyComponent },
];
