export interface Station {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  description: string;
  weightOpen: string;
  weightPro: string;
  tips: string[];
  exercise: string;
}

export interface Session {
  id: string;
  date: Date;
  stations: StationResult[];
  notes?: string;
  totalTime?: number;
}

export interface StationResult {
  stationId: string;
  timeSeconds: number;
}

export interface HyroxPrediction {
  totalTimeSeconds: number;
  runTimeSeconds: number;
  stationsTimeSeconds: number;
  percentile: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  category: 'open' | 'pro' | 'doubles';
  isPremium: boolean;
  trialEndsAt?: Date;
}
