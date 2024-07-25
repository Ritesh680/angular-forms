import { Component, OnInit } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { TabsComponent } from '@components/tabs/tabs.component';
import { TabComponent } from '@components/tabs/tab/tab.component';
import { TabContentComponent } from '@components/tabs/tab-content/tab-content.component';
import { StepperComponent } from '../../component/stepper/stepper.component';
import { StepperHeaderComponent } from '../../component/stepper/stepper-header/stepper-header.component';
import { StepperContentComponent } from '../../component/stepper/stepper-content/stepper-content.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { GeneralComponent } from '../general/general.component';
import { TabContentDirective } from '../../directives/tabContent/tab-content.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../services/apiClient/api-client.service';
import { Module, Service } from '@interfaces';
import { LoaderDirective } from '../../directives/loader/loader.directive';
import { AxiosResponse } from 'axios';
import { PreferencesComponent } from '../preferences/preferences.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    TemplateComponent,
    TabsComponent,
    TabComponent,
    TabContentComponent,
    StepperComponent,
    StepperHeaderComponent,
    StepperContentComponent,
    PrivacyComponent,
    GeneralComponent,
    TabContentDirective,
    LoaderDirective,
    PreferencesComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  activeTab: string = '';

  modules: Module[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClientService
  ) {}

  isActive(name: string): boolean {
    return name === this.activeTab;
  }

  handleTabChange(event: StepperHeaderComponent): void {
    const tab = event.title.toLowerCase();
    this.activeTab = tab;
    this.updateUrlParams(tab);
  }

  get hashUrl() {
    return this.route.snapshot.fragment ?? undefined;
  }

  getCurrentTab(): string | null {
    const currentTab = this.route.snapshot.queryParams['tab'];

    if (!currentTab) {
      return this.activeTab;
    }
    return currentTab.toLowerCase();
  }

  updateUrlParams(tab: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tab.replace(/\s/, '-').toLowerCase() },
      fragment: this.hashUrl,
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.fetchServiceData();
    const currentTab = this.getCurrentTab();
    if (currentTab) {
      this.activeTab = currentTab;
      this.updateUrlParams(currentTab);
    }
  }

  private async fetchServiceData() {
    const res = await this.apiClient.get<AxiosResponse<Service>>({
      url: '/services/4',
    });

    this.modules = res.data.modules;
  }
}
