import type { VideoData } from '../../video/EnhancedVideoPlayer/types';

export interface FacebookPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    isPage?: boolean;
    isVerified?: boolean;
  };
  content: {
    text?: string;
    media?: {
      type: 'video' | 'image';
      url: string;
      thumbnail?: string;
      videoData?: VideoData;
    };
  };
  engagement: {
    likes: string;
    comments: string;
    shares: string;
  };
  timeAgo: string;
  isAd?: boolean;
  adType?: 'turkish' | 'german';
}

export interface FacebookInterfaceProps {
  posts: FacebookPost[];
  className?: string;
  onVideoPlay?: (postId: string) => void;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}