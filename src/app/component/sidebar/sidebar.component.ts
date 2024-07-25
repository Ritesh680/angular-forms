import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface ISidebar {
  label: string;
  id: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() sidebar: ISidebar[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  isSidebarAccordionOpen: boolean = true;

  get hashUrl(): string {
    return this.route.snapshot.fragment ?? this.sidebar[0].id;
  }

  isSidebarActive(sectionId: string): boolean {
    let hashUrl = this.route.snapshot.fragment;
    if (!hashUrl) {
      hashUrl = this.sidebar[0].id;
    }
    return sectionId === hashUrl;
  }

  toggleSidebarAccordion(): void {
    this.isSidebarAccordionOpen = !this.isSidebarAccordionOpen;
  }

  scrollToSection(sectionId?: string): void {
    const hashUrl = sectionId ?? this.hashUrl;

    const section = document.getElementById(hashUrl);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  handleRedirection(sectionId: string, event: Event): void {
    event.preventDefault(); // prevent the default link navigation
    const params = new URLSearchParams(window.location.search);

    this.router.navigateByUrl(`/?${params.toString()}#${sectionId}`);

    this.scrollToSection(sectionId);
  }

  ngOnInit(): void {
    console.log('SidebarComponent initialized');
    this.scrollToSection();
  }

  ngOnDestroy(): void {
    console.log('SidebarComponent destroyed');
  }
}
