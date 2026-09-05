export type MilestoneCategory =
  | "release"
  | "award"
  | "concert"
  | "career"
  | "legacy";

export interface HistoryEvent {
  year: string;
  event: string;
  category?: MilestoneCategory;
}

export interface TrackCatalogItem {
  number: string;
  title: string;
  album: string;
  duration: string;
  youtubeId?: string;
}

export interface MusicianQuote {
  text: string;
  source?: string;
  year?: string;
}

export interface AwardItem {
  year: string;
  title: string;
  organization: string;
  category?: string;
}

export interface MusicalProfile {
  primaryInstruments: string[];
  influences?: string[];
  subGenres?: string[];
}

export interface CollaborationItem {
  name: string;
  projectTitle?: string;
  role?: string;
}

export interface MusicianData {
  id: string;
  slug: string;
  name: string;
  genre: string;
  year: string;
  image: string;
  album: string;
  biography: string;
  exhibitionImages?: string[];
  youtubeId?: string;
  historyTimeline: HistoryEvent[];
  catalog: TrackCatalogItem[];

  // Optional Enrichment Fields
  headlineSummary?: string;
  signatureQuote?: MusicianQuote;
  musicalProfile?: MusicalProfile;
  awards?: AwardItem[];
  collaborations?: (string | CollaborationItem)[];
}
