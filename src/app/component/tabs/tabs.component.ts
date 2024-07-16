import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    QueryList.prototype;

  constructor(private route: ActivatedRoute, private router: Router) {}

  updateUrlParams(tab: TabComponent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tab.tabTitle.replace(/\s/, '-').toLowerCase() },
      queryParamsHandling: 'merge',
    });
  }

  getCurrentTab(): string | null {
    const currentTab = this.route.snapshot.queryParams['tab'];
    if (!currentTab) {
      return null;
    }
    return currentTab.toLowerCase();
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => tab.active);

    const currentTab = this.tabs.filter(
      (tab) =>
        tab.tabTitle.replace(' ', '-').toLowerCase() === this.getCurrentTab()
    )[0];

    if (activeTabs.length === 0) {
      this.selectTab(currentTab ?? this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach((t) => (t.active = false));
    tab.active = true;
    this.updateUrlParams(tab);
  }
}
