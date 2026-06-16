import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Artist {
  id: number;
  name: string;
  bio: string;
  photoUrl: string;
  collection: string[];
}

@Component({
  selector: 'app-artist-spotlight',
  templateUrl: './artist-spotlight.component.html',
  styleUrls: ['./artist-spotlight.component.scss']
})
export class ArtistSpotlightComponent implements OnInit {
  artists: Artist[] = [];
  selectedArtist: Artist | null = null;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.artists = [
      {
        id: 1,
        name: 'Ava Sinclair',
        bio: 'Digital visionary blending color and AI expression.',
        photoUrl: 'assets/images/Ava Sinclair.png',
        collection: [
          'assets/images/ai1.png',
          'assets/images/ai2.png',
          'assets/images/ai3.png'
        ]
      },
      {
        id: 2,
        name: 'Leo Nakamura',
        bio: 'Tech-inspired artist merging futurism with emotion.',
        photoUrl: 'assets/images/Leo Nakamura.png',
        collection: [
          'assets/images/tec1.png',
          'assets/images/tec2.png',
          'assets/images/tec3.png'
        ]
      },
      {
        id: 3,
        name: 'Maya Rios',
        bio: 'Exploring human emotion through digital texture.',
        photoUrl: 'assets/images/Maya Rios.png',
        collection: [
          'assets/images/digi1.png',
          'assets/images/digi2.png',
          'assets/images/digi3.png'
        ]
      },
      {
        id: 4,
        name: 'Noah Vale',
        bio: 'Minimalist designer finding art in simplicity.',
        photoUrl: 'assets/images/Noah Vale.png',
        collection: [
          'assets/images/sim1.png',
          'assets/images/sim2.png',
          'assets/images/sim3.png'
        ]
      }
    ];
  }

  openCollection(modalTemplate: TemplateRef<any>, artist: Artist): void {
    this.selectedArtist = artist;
    this.modalService.open(modalTemplate, { size: 'lg', centered: true });
  }
}
