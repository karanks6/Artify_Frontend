export interface Artwork {
  id: number;
  title: string;
  artistId: number;
  artistName: string;
  imageUrl: string;
  thumbUrl?: string;
  description?: string;
  year?: number;
}
