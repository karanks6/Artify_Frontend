import { Component } from '@angular/core';

@Component({ selector: 'app-hero-section', templateUrl: './hero-section.component.html', styleUrls: ['./hero-section.component.scss'] })
export class HeroSectionComponent {
  scrollTo(id: string){ document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
