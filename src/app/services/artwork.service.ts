import { Injectable } from '@angular/core';
import { Artwork } from '../models/artwork.model';
import { Artist } from '../models/artist.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArtworkService {
  private artists: Artist[] = [
    { id: 1, name: 'Luna Vega', photoUrl: 'assets/images/artist1.jpg', bio: 'Glitch artist & generative designer.' },
    { id: 2, name: 'Kai Nova', photoUrl: 'assets/images/artist2.jpg', bio: '3D sculptor merging neon futures.' },
    { id: 3, name: 'Mira Sol', photoUrl: 'assets/images/artist3.jpg', bio: 'Abstract painter exploring color.' },
    { id: 4, name: 'Orin Pax', photoUrl: 'assets/images/artist4.jpg', bio: 'AI-assisted visual storyteller.' }
  ];

  private artworks: Artwork[] = [
    { id: 1, title: 'Neon Bloom', artistId: 1, artistName: 'Luna Vega', imageUrl: 'assets/images/art1.jpg', thumbUrl: 'assets/images/art1_thumb.jpg', description: 'A generative floral burst.' },
    { id: 2, title: 'Deep City', artistId: 2, artistName: 'Kai Nova', imageUrl: 'assets/images/art2.jpg', thumbUrl: 'assets/images/art2_thumb.jpg', description: 'Cyber-architecture at dusk.' },
    { id: 3, title: 'Chromatic Wave', artistId: 3, artistName: 'Mira Sol', imageUrl: 'assets/images/art3.jpg', thumbUrl: 'assets/images/art3_thumb.jpg', description: 'Flowing color fields.' },
    { id: 4, title: 'Echo Realm', artistId: 4, artistName: 'Orin Pax', imageUrl: 'assets/images/art4.jpg', thumbUrl: 'assets/images/art4_thumb.jpg', description: 'A.I. dreamscapes.' }
  ];

  getFeaturedArtworks(): Observable<Artwork[]>{ return of(this.artworks); }
  getArtworkById(id:number): Observable<Artwork | undefined>{ return of(this.artworks.find(a=>a.id===id)); }
  getArtists(): Observable<Artist[]>{ return of(this.artists); }
  getArtistById(id:number): Observable<Artist|undefined>{ return of(this.artists.find(a=>a.id===id)); }
}
