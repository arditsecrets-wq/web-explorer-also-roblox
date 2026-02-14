
export interface RobloxGame {
  id: string;
  name: string;
  creator: string;
  thumbnail: string;
  description: string;
  rating: number;
  playing: string;
}

export interface RecommendedGame {
  name: string;
  reason: string;
  category: string;
}

export type PlayerMode = 'standard' | 'theater' | 'fullscreen';
