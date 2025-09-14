import { ApiService } from './api.service';
import type { ILocalStorageService } from '../../types';

export interface CampaignGenerateRequest {
  video_id: number;
  country_codes: string[];
  platforms?: string[];
  objective?: string;
  max_variants?: number;
}

export interface CampaignTargeting {
  ageRange: string;
  interests: string[];
  demographics: string | string[];
  location?: string;
}

export interface CampaignBudget {
  suggested: number;
  currency: string;
}

export interface CampaignCreative {
  aspect_ratio: string;
  headline: string;
  hashtags: string[];
}

export interface CampaignMeasurement {
  utm: string;
  experiments: string[];
}

export interface Campaign {
  platform: string;
  adText: string;
  targeting: CampaignTargeting;
  budget: CampaignBudget;
  call_to_action: string;
  creative: CampaignCreative;
  policy_notes: string[];
  measurement: CampaignMeasurement;
}

export interface CampaignVariant {
  adText: string;
  headline: string;
}

export interface CampaignData {
  country_code: string;
  country_name: string;
  platform: string;
  campaign: Campaign;
  variants: CampaignVariant[];
}

export interface EnhancedCampaignData {
  country: string;
  countryName: string;
  platform: 'facebook' | 'google' | 'tiktok';
  adText: string;
  targeting: {
    ageRange: string;
    interests: string[];
    demographics: string;
    location?: string;
  };
  budget: {
    suggested: number;
    currency: string;
  };
  callToAction: string;
  creative: {
    aspectRatio: string;
    headline: string;
    hashtags: string[];
  };
  policyNotes: string[];
  measurement: {
    utm: string;
    experiments: string[];
  };
  variants: CampaignVariant[];
}

export interface CampaignGenerateResponse {
  video_id: number;
  campaigns: CampaignData[];
  compact: Array<{
    country: string;
    platform: string;
    adText: string;
    targeting: CampaignTargeting;
    budget: CampaignBudget;
  }>;
}

export class CampaignService {
  private readonly apiService: ApiService;

  constructor(localStorageService: ILocalStorageService) {
    this.apiService = new ApiService(localStorageService);
  }

  /**
   * Generate platform-specific campaign plans per country using AI
   */
  async generateCampaigns(request: CampaignGenerateRequest): Promise<CampaignGenerateResponse> {
    try {
      const response = await this.apiService.post<CampaignGenerateResponse>(
        '/api/campaigns/generate',
        {
          video_id: request.video_id,
          country_codes: request.country_codes,
          platforms: request.platforms || ['facebook', 'google', 'tiktok'],
          objective: request.objective || 'conversions',
          max_variants: request.max_variants || 2
        }
      );

      return response;
    } catch (error) {
      console.error('Campaign generation failed:', error);
      throw new Error('Kampanya üretimi başarısız oldu. Lütfen tekrar deneyin.');
    }
  }

  /**
   * Transform backend campaign data to enhanced frontend format
   */
  transformToFrontendFormat(backendData: CampaignGenerateResponse): EnhancedCampaignData[] {
    return backendData.campaigns.map(campaign => ({
      country: campaign.country_code,
      countryName: campaign.country_name,
      platform: campaign.platform as 'facebook' | 'google' | 'tiktok',
      adText: campaign.campaign.adText,
      targeting: {
        ageRange: campaign.campaign.targeting.ageRange,
        interests: campaign.campaign.targeting.interests,
        demographics: Array.isArray(campaign.campaign.targeting.demographics) 
          ? campaign.campaign.targeting.demographics.join(', ')
          : campaign.campaign.targeting.demographics,
        location: campaign.campaign.targeting.location
      },
      budget: {
        suggested: campaign.campaign.budget.suggested,
        currency: campaign.campaign.budget.currency
      },
      callToAction: campaign.campaign.call_to_action,
      creative: {
        aspectRatio: campaign.campaign.creative.aspect_ratio,
        headline: campaign.campaign.creative.headline,
        hashtags: campaign.campaign.creative.hashtags
      },
      policyNotes: campaign.campaign.policy_notes,
      measurement: {
        utm: campaign.campaign.measurement.utm,
        experiments: campaign.campaign.measurement.experiments
      },
      variants: campaign.variants || []
    }));
  }
}

// Helper function to create service instance
export function createCampaignService(localStorageService: ILocalStorageService): CampaignService {
  return new CampaignService(localStorageService);
}
