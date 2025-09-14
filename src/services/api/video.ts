import { ApiService } from './api.service';
import type { ILocalStorageService } from '../../types';

export interface VideoUploadResponse {
  message: string;
  video: {
    id: number;
    filename: string;
    original_filename: string;
    file_size: number;
    duration?: number;
    status: string;
    content_type: string;
    language?: string;
    description?: string;
    is_advertisement: boolean;
    created_at: string;
    updated_at: string;
  };
}

export interface VideoResponse {
  id: number;
  filename: string;
  original_filename: string;
  file_size: number;
  duration?: number;
  status: string;
  content_type: string;
  language?: string;
  description?: string;
  is_advertisement: boolean;
  created_at: string;
  updated_at: string;
}

export interface TranscriptionSegment {
  start_time: number;
  end_time: number;
  text: string;
  confidence?: number;
  speaker_id?: string;
}

export interface TranscriptionResponse {
  id: number;
  video_id: number;
  status: string;
  language_code: string;
  full_text?: string;
  segments?: TranscriptionSegment[];
  confidence_score?: number;
  processing_time?: number;
  model_used: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface ProcessingStatusResponse {
  video_id: number;
  video_status: string;
  transcription_status?: string;
  language?: string;
  duration?: number;
  created_at: string;
  updated_at: string;
  transcription_confidence?: number;
  processing_time?: number;
}

export interface LocalizationJobRequest {
  video_id: number;
  target_countries: string[];
  user_id?: number;
  preferences?: {
    analysis_depth?: string;
    cultural_sensitivity?: string;
    brand_consistency?: string;
    preserve_brand_elements?: boolean;
    adapt_for_culture?: boolean;
    maintain_video_timing?: boolean;
  };
}

export interface LocalizationJobResponse {
  job_id: number;
  video_id: number;
  status: string;
  target_countries: string[];
  progress_percentage: number;
  estimated_completion?: string;
  created_at: string;
}

export class VideoApi {
  private api: ApiService;

  constructor(storage: ILocalStorageService) {
    this.api = new ApiService(storage);
  }

  async uploadVideo(file: File, description?: string): Promise<VideoUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }

    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout

    try {
      const response = await fetch(`${this.api.baseURL}/api/videos/upload`, {
        method: 'POST',
        headers: {
          // Don't set Content-Type for FormData, let browser set it with boundary
          ...this.api.getHeaders(false),
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Upload failed with status ${response.status}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Upload timeout - please try again with a smaller file or check your connection');
      }
      throw error;
    }
  }

  async getVideos(): Promise<VideoResponse[]> {
    return this.api.get<VideoResponse[]>('/api/videos/');
  }

  async getVideo(videoId: number): Promise<VideoResponse> {
    return this.api.get<VideoResponse>(`/api/videos/${videoId}`);
  }

  async getVideoStatus(videoId: number): Promise<ProcessingStatusResponse> {
    return this.api.get<ProcessingStatusResponse>(`/api/videos/${videoId}/status`);
  }

  async transcribeVideo(videoId: number, languageHint?: string): Promise<TranscriptionResponse> {
    return this.api.post<TranscriptionResponse>(`/api/videos/${videoId}/transcribe`, {
      language_hint: languageHint,
    });
  }

  async getTranscription(videoId: number): Promise<TranscriptionResponse> {
    return this.api.get<TranscriptionResponse>(`/api/videos/${videoId}/transcription`);
  }

  async deleteVideo(videoId: number): Promise<{ message: string }> {
    return this.api.delete<{ message: string }>(`/api/videos/${videoId}`);
  }

  async createLocalizationJob(request: LocalizationJobRequest): Promise<LocalizationJobResponse> {
    return this.api.post<LocalizationJobResponse>('/api/localization/jobs', request);
  }

  async startLocalizationJob(jobId: number): Promise<{ message: string; status: string }> {
    return this.api.post<{ message: string; status: string }>(`/api/localization/jobs/${jobId}/start`);
  }

  async getLocalizationJob(jobId: number): Promise<any> {
    return this.api.get(`/api/localization/jobs/${jobId}`);
  }

  async getJobTranslations(jobId: number): Promise<any> {
    return this.api.get(`/api/localization/jobs/${jobId}/translations`);
  }

  async getVideoLocalizations(videoId: number): Promise<any> {
    return this.api.get(`/api/localization/videos/${videoId}/localizations`);
  }

  // Utility method to poll video status until processing is complete
  async pollVideoStatus(
    videoId: number,
    onProgress?: (status: ProcessingStatusResponse) => void,
    maxAttempts: number = 30, // Reduced from 60 to 30 (1 minute total)
    intervalMs: number = 2000
  ): Promise<ProcessingStatusResponse> {
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const status = await this.getVideoStatus(videoId);

        if (onProgress) {
          onProgress(status);
        }

        // Check if processing is complete
        if (status.video_status === 'completed' || status.video_status === 'failed') {
          return status;
        }

        attempts++;
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      } catch (error) {
        // If status check fails, retry with exponential backoff
        attempts++;
        const backoffTime = Math.min(intervalMs * Math.pow(1.5, attempts), 10000);
        await new Promise(resolve => setTimeout(resolve, backoffTime));

        if (attempts >= maxAttempts) {
          throw new Error(`Video processing status check failed after ${attempts} attempts`);
        }
      }
    }

    throw new Error(`Video processing timeout after ${maxAttempts} attempts (${(maxAttempts * intervalMs) / 1000}s)`);
  }
}