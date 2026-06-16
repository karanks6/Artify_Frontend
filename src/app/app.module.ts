import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ArtworkCarouselComponent } from './components/artwork-carousel/artwork-carousel.component';
import { ArtistSpotlightComponent } from './components/artist-spotlight/artist-spotlight.component';
import { CommunitySectionComponent } from './components/community-section/community-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArtworkModalComponent } from './components/artwork-modal/artwork-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroSectionComponent,
    ArtworkCarouselComponent,
    ArtistSpotlightComponent,
    CommunitySectionComponent,
    FooterComponent,
    ArtworkModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    RouterModule.forRoot([], { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
