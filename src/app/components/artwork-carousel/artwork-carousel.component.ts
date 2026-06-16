import { Component, OnInit, OnDestroy } from '@angular/core';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-artwork-carousel',
  templateUrl: './artwork-carousel.component.html',
  styleUrls: ['./artwork-carousel.component.scss']
})
export class ArtworkCarouselComponent implements OnInit, OnDestroy {
  artworks: Artwork[] = [];
  activeIndex = 0;
  autoPlayIntervalId: any = null;
  autoPlayMs = 4000; // 4s per slide

  ngOnInit(): void {
    // use root-relative paths to ensure correct resolution
    this.artworks = [
      {
        id: 1,
        artistId: 101,
        title: 'Neon Dreams',
        artistName: 'Ava Sinclair',
        description: 'A fusion of cyberpunk tones and ethereal light.',
        imageUrl: '/assets/images/horaizon.png'
      },
      {
        id: 2,
        artistId: 102,
        title: 'Digital Horizon',
        artistName: 'Leo Nakamura',
        description: 'An abstract portrayal of AI and human synergy.',
        imageUrl: '/assets/images/dream.png'
      },
      {
        id: 3,
        artistId: 103,
        title: 'Ethereal Bloom',
        artistName: 'Maya Rios',
        description: 'A delicate balance of technology and nature.',
        imageUrl: '/assets/images/tree.png'
      }
    ];

    // small delay then start autoplay (helps bypass race conditions)
    setTimeout(() => this.startAutoPlay(), 100);
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    if (this.autoPlayIntervalId != null) { return; }
    this.autoPlayIntervalId = setInterval(() => this.next(), this.autoPlayMs);
  }

  stopAutoPlay() {
    if (this.autoPlayIntervalId != null) {
      clearInterval(this.autoPlayIntervalId);
      this.autoPlayIntervalId = null;
    }
  }

  goTo(index: number) {
    if (index < 0) { index = 0; }
    if (index >= this.artworks.length) { index = this.artworks.length - 1; }
    this.activeIndex = index;
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.artworks.length;
  }

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.artworks.length) % this.artworks.length;
  }

  openPreview(index: number): void {
    const art = this.artworks[index];
    // temporary behaviour: in your project you can hook this to the modal component
    alert(`Viewing "${art.title}" by ${art.artistName}`);
  }
}
