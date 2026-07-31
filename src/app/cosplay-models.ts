// Mirrors the existing Firestore document shape in the `cosplay`
// collection (unchanged from the old site) — field names here must
// match what's actually stored, since this isn't a data migration,
// just a typed read of existing documents.

export interface CosplayNote {
  title: string;
  description: string;
  link?: string;
}

export interface GalleryImage {
  small: string;
  medium: string;
  big: string;
}

export interface WipImage {
  img: string;
  desc?: string;
}

export interface CosplayCredit {
  name: string;
  link?: string;
}

export interface CosplayCharacterCredit extends CosplayCredit {
  char: string;
}

export interface CosplayDetails {
  // Not a stored field — assigned from the Firestore document ID when
  // read (see cosplays.ts), same as the old site's { idField: 'id' }.
  id: string;
  name: string;
  order: number;
  series: string;
  year: number;
  notes: CosplayNote[];
  description: string;
  mainImgUrl: string;
  photographer: CosplayCredit[];
  cosplayers: CosplayCharacterCredit[];
  imgGalleryUrls: GalleryImage[];
  wipGalleryUrls: WipImage[];
  wip?: string;
}
