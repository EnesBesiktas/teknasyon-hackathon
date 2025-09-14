import type { PlatformType } from '../../buttons/KingdomButton';
import type { VideoData } from '../../../mobile/video/EnhancedVideoPlayer/types';

export type ViewState = 'main' | 'kingdom-selection' | 'platform-view';

export interface MobilePreviewProps {
  className?: string;
}

export interface MobilePreviewState {
  currentView: ViewState;
  selectedPlatform: PlatformType | null;
  isLoading: boolean;
  videoData: Record<string, VideoData>;
  error: string | null;
}

export interface MockData {
  instagram: any[];
  facebook: any[];
  twitter: any[];
}