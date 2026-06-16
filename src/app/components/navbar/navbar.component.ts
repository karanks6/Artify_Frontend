import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ selector: 'app-navbar', templateUrl: './navbar.component.html', styleUrls: ['./navbar.component.scss'] })
export class NavbarComponent {
  @Input() dark = true;
  @Output() toggleDark = new EventEmitter<void>();
  onToggle(){ this.toggleDark.emit(); }
}
