import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss'] })
export class AppComponent implements OnInit {
  dark = false;
  ngOnInit(): void { AOS.init({ once: true, duration: 700 }); this.syncTheme(); }
  toggleDark(){ this.dark = !this.dark; document.body.classList.toggle('light-mode', !this.dark); localStorage.setItem('artify-dark', JSON.stringify(this.dark)); }
  syncTheme(){ const stored = localStorage.getItem('artify-dark'); if(stored !== null){ this.dark = JSON.parse(stored); document.body.classList.toggle('light-mode', !this.dark); } else { this.dark = true; document.body.classList.remove('light-mode'); } }
}
