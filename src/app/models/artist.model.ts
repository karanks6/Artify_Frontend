export interface Artist {
  id: number;
  name: string;
  photoUrl: string;
  bio: string;
  social?: { twitter?: string; instagram?: string; discord?: string };
}
