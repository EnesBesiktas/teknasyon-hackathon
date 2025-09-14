export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  sources: VideoSource[];
}

export interface VideoSource {
  src: string;
  type: string;
}

export interface VideoPlayerProps {
  videoData: VideoData;
  isLoading?: boolean;
  error?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: string) => void;
}

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isLoading: boolean;
  error: string | null;
}