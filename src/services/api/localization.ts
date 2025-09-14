import { ApiService } from './api.service';
import type { ILocalStorageService } from '../../types';

export interface CountryInfo {
  id: number;
  country_code: string;
  country_name: string;
  language_code: string;
  language_name: string;
  dialect: string;
  communication_style: string;
  marketing_preferences: string;
  priority: number;
}

export interface DirectLocalizationRequest {
  video_id: number;
  country_code: string;
  use_local_tts?: boolean;
  music_only_background?: boolean;
  split_into_parts?: number;
  max_part_duration?: number;
}

export interface FastLocalizationRequest {
  video_id: number;
  country_code: string;
  force_local_tts?: boolean;
}

export interface DirectLocalizationResponse {
  translation_id: number | null;
  status: string;
  target_country?: { code?: string; name?: string; language?: string } | null;
  final_video_url?: string | null;
  final_video_path?: string | null;
  parts?: Array<{ index?: number; final_video_url?: string; final_video_path?: string }>;
}

export interface CulturalAnalysisRequest {
  video_id: number;
  country_codes: string[];
}

export interface CulturalAnalysisResponse {
  video_id: number;
  results: Array<any>; // structured per backend schema
}

export class LocalizationApi {
  private api: ApiService;
  constructor(storage: ILocalStorageService) {
    this.api = new ApiService(storage);
  }

  getCountries(groupByLanguage = false) {
    return this.api.get<CountryInfo[]>(`/api/localization/countries?group_by_language=${groupByLanguage}`);
  }

  directLocalize(payload: DirectLocalizationRequest) {
    return this.api.post<DirectLocalizationResponse>(`/api/localization/direct`, payload);
  }

  fastLocalize(payload: FastLocalizationRequest) {
    return this.api.post<DirectLocalizationResponse>(`/api/localization/fast`, payload);
  }

  analyzeCulture(payload: CulturalAnalysisRequest) {
    return this.api.post<CulturalAnalysisResponse>(`/api/localization/analysis`, payload);
  }
}

