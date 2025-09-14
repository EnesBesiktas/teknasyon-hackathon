export interface Country {
  code: string;
  name: string;
  flag: string;
  language: string;
}

export interface AnalysisResult {
  culturalScore: number;
  contentSuitability: number;
  marketPotential: number;
  recommendations: string[];
  riskFactors: string[];
  targetAudience: string;
}

export interface LocalizationProgress {
  dubbing: {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    language: string;
  }[];
  translation: {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    language: string;
  }[];
  adaptation: {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    changes: string[];
  };
}

export interface CampaignData {
  country: string;
  platform: 'facebook' | 'google' | 'tiktok';
  adText: string;
  targeting: {
    ageRange: string;
    interests: string[];
    demographics: string;
  };
  budget: {
    suggested: number;
    currency: string;
  };
}

export type WorkflowStep = 'upload' | 'analysis' | 'localization' | 'marketing';

export interface IronBankState {
  currentStep: WorkflowStep;
  videoFile: File | null;
  targetCountries: Country[];
  analysisData: AnalysisResult | null;
  localizationProgress: LocalizationProgress | null;
  campaignData: CampaignData[];
  isLoading: boolean;
  error: string | null;
}

export const AVAILABLE_COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', language: 'English' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', language: 'Turkish' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', language: 'German' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', language: 'Spanish' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', language: 'Italian' },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵', language: 'Korean' },
  { code: 'CN', name: 'China', flag: '🇨🇳', language: 'Chinese' },
];