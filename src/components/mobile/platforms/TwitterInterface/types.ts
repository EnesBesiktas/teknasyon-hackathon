import type { VideoData } from '../../video/EnhancedVideoPlayer/types';

export interface Tweet {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
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
    replies: string;
    retweets: string;
    likes: string;
    views: string;
  };
  timeAgo: string;
  isAd?: boolean;
  adType?: 'turkish' | 'german';
}

export interface TwitterInterfaceProps {
  tweets: Tweet[];
  className?: string;
  onVideoPlay?: (tweetId: string) => void;
  onLike?: (tweetId: string) => void;
  onRetweet?: (tweetId: string) => void;
  onReply?: (tweetId: string) => void;
  onShare?: (tweetId: string) => void;
}