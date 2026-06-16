import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Artwork } from '../../models/artwork.model';

@Component({ selector: 'app-artwork-modal', templateUrl: './artwork-modal.component.html', styleUrls: ['./artwork-modal.component.scss'] })
export class ArtworkModalComponent {
  @Input() artworks: Artwork[] = [];
  @Input() index = 0;
  constructor(public activeModal: NgbActiveModal) {}
  get current(){ return this.artworks[this.index]; }
  next(){ if(this.index < this.artworks.length - 1) this.index++; }
  prev(){ if(this.index > 0) this.index--; }
}
