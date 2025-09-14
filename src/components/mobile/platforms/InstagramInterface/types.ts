import type { VideoData } from '../../video/EnhancedVideoPlayer/types';

export interface InstagramPost {
  id: string;
  user: {
    username: string;
    displayName: string;
    avatar: string;
    isVerified?: boolean;
  };
  media: {
    type: 'video' | 'image';
    url: string;
    thumbnail?: string;
    videoData?: VideoData;
  };
  caption: string;
  likes: string;
  comments: string;
  timeAgo: string;
  isAd?: boolean;
  adType?: 'turkish' | 'german';
  location?: string;
}

export interface InstagramInterfaceProps {
  posts: InstagramPost[];
  className?: string;
  onVideoPlay?: (postId: string) => void;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}