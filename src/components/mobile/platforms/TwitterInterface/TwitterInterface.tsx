import React from 'react';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  CheckCircle,
  Home,
  Search,
  PlusCircle,
  Bell,
  Mail
} from 'lucide-react';
import { EnhancedVideoPlayer } from '../../video/EnhancedVideoPlayer';
import type { TwitterInterfaceProps, Tweet } from './types';

const TwitterHeader: React.FC = () => (
  <div className="bg-black border-b border-gray-800 px-4 py-3">
    <div className="flex items-center justify-center">
      {/* X logosu */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    </div>

    {/* Alt kısım - For you / Following tabları */}
    <div className="flex items-center justify-center mt-3">
      <div className="flex items-center space-x-8 text-gray-400">
        <span className="text-white text-base font-bold border-b-2 border-blue-500 pb-2">For you</span>
        <span className="text-base font-bold">Following</span>
      </div>
    </div>
  </div>
);

const TwitterBottomNav: React.FC = () => (
  <div className="bg-black border-t border-gray-800 px-4 py-1.5">
    <div className="flex items-center justify-around">
      <Home className="h-5 w-5 text-white" />
      <Search className="h-5 w-5 text-gray-500" />
      <PlusCircle className="h-5 w-5 text-gray-500" />
      <Bell className="h-5 w-5 text-gray-500" />
      <Mail className="h-5 w-5 text-gray-500" />
    </div>
  </div>
);

const TweetHeader: React.FC<{ tweet: Tweet }> = ({ tweet }) => (
  <div className="flex items-start justify-between px-3 pt-2 pb-1">
    <div className="flex items-start space-x-2">
      <img
        src={tweet.user.avatar}
        alt={tweet.user.username}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center space-x-1 flex-wrap">
          <span className="text-white text-sm font-bold truncate">{tweet.user.name}</span>
          {tweet.user.isVerified && <CheckCircle className="h-3 w-3 text-blue-500 flex-shrink-0" />}
          <span className="text-gray-500 text-xs truncate">@{tweet.user.username}</span>
          <span className="text-gray-500 text-xs">·</span>
          <span className="text-gray-500 text-xs">{tweet.timeAgo}</span>
          {tweet.isAd && (
            <>
              <span className="text-gray-500 text-xs">·</span>
              <span className="text-gray-500 text-xs">Promoted</span>
            </>
          )}
        </div>
      </div>
    </div>
    <MoreHorizontal className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
  </div>
);

const TweetEngagement: React.FC<{
  tweet: Tweet;
  onReply?: () => void;
  onRetweet?: () => void;
  onLike?: () => void;
  onShare?: () => void;
}> = ({ tweet, onReply, onRetweet, onLike, onShare }) => (
  <div className="px-3 pb-2">
    <div className="flex items-center justify-between max-w-xs">
      <button
        onClick={onReply}
        className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors group"
      >
        <div className="p-1.5 rounded-full group-hover:bg-blue-500/10 transition-colors">
          <MessageCircle className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs">{tweet.engagement.replies}</span>
      </button>

      <button
        onClick={onRetweet}
        className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors group"
      >
        <div className="p-1.5 rounded-full group-hover:bg-green-500/10 transition-colors">
          <Repeat2 className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs">{tweet.engagement.retweets}</span>
      </button>

      <button
        onClick={onLike}
        className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors group"
      >
        <div className="p-1.5 rounded-full group-hover:bg-red-500/10 transition-colors">
          <Heart className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs">{tweet.engagement.likes}</span>
      </button>

      <button
        onClick={onShare}
        className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors group"
      >
        <div className="p-1.5 rounded-full group-hover:bg-blue-500/10 transition-colors">
          <Share className="h-3.5 w-3.5" />
        </div>
      </button>
    </div>

    {/* Views Count */}
    <div className="mt-1 text-gray-500 text-xs">
      {tweet.engagement.views} views
    </div>
  </div>
);

const TweetComponent: React.FC<{
  tweet: Tweet;
  onVideoPlay?: () => void;
  onReply?: () => void;
  onRetweet?: () => void;
  onLike?: () => void;
  onShare?: () => void;
}> = ({ tweet, onVideoPlay, onReply, onRetweet, onLike, onShare }) => {
  const getAdBadgeColor = () => {
    if (!tweet.isAd) return '';
    return tweet.adType === 'turkish' ? 'from-yellow-400 to-orange-500' : 'from-red-500 to-red-600';
  };

  return (
    <div className="bg-black border-b border-gray-800 hover:bg-gray-950/50 transition-colors cursor-pointer relative">
      {/* Ad Badge */}
      {tweet.isAd && (
        <div className="absolute top-2 right-2 z-10">
          <div className={`bg-gradient-to-r ${getAdBadgeColor()} px-2 py-1 rounded-full shadow-lg`}>
          </div>
        </div>
      )}

      <TweetHeader tweet={tweet} />

      {/* Tweet Content */}
      {tweet.content.text && (
        <div className="px-3 pb-2">
          <p className="text-white text-sm leading-normal">{tweet.content.text}</p>
        </div>
      )}

      {/* Media */}
      {tweet.content.media && (
        <div className="mx-3 mb-2 rounded-xl overflow-hidden">
          <div className="aspect-video bg-gray-900 relative">
            {tweet.content.media.type === 'video' && tweet.content.media.videoData ? (
              <div
                className="w-full h-full cursor-pointer group"
                onClick={onVideoPlay}
              >
                <EnhancedVideoPlayer
                  videoData={tweet.content.media.videoData}
                  className="w-full h-full rounded-xl"
                  onPlay={onVideoPlay}
                  autoPlay={false}
                  muted={true}
                  loop={true}
                />
                {/* Video overlay with time */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  0:45
                </div>
              </div>
            ) : (
              <img
                src={tweet.content.media.url}
                alt="Tweet media"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}

      <TweetEngagement
        tweet={tweet}
        onReply={onReply}
        onRetweet={onRetweet}
        onLike={onLike}
        onShare={onShare}
      />
    </div>
  );
};

export const TwitterInterface: React.FC<TwitterInterfaceProps> = ({
  tweets,
  className = '',
  onVideoPlay,
  onLike,
  onRetweet,
  onReply,
  onShare,
}) => {
  return (
    <div className={`bg-black text-white h-full flex flex-col overflow-hidden ${className}`}>
      <div className="flex-shrink-0">
        <TwitterHeader />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-0">
          {tweets.map((tweet) => (
            <TweetComponent
              key={tweet.id}
              tweet={tweet}
              onVideoPlay={() => onVideoPlay?.(tweet.id)}
              onReply={() => onReply?.(tweet.id)}
              onRetweet={() => onRetweet?.(tweet.id)}
              onLike={() => onLike?.(tweet.id)}
              onShare={() => onShare?.(tweet.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0">
        <TwitterBottomNav />
      </div>
    </div>
  );
};