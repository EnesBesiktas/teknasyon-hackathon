import React from 'react';
import { Search, MessageSquare, ThumbsUp, MessageCircle, Share, Crown, CheckCircle, MoreHorizontal, Plus, Bell, Home, Play, Store, User, Menu } from 'lucide-react';
import { EnhancedVideoPlayer } from '../../video/EnhancedVideoPlayer';
import type { FacebookInterfaceProps, FacebookPost } from './types';

const FacebookHeader: React.FC = () => (
  <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">f</span>
      </div>
      <span className="text-gray-800 text-lg font-bold">facebook</span>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <Plus className="h-5 w-5 text-gray-600" />
      </div>
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <Search className="h-5 w-5 text-gray-600" />
      </div>
      <div className="relative">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-gray-600" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">3</span>
        </div>
      </div>
    </div>
  </div>
);

const PostHeader: React.FC<{ post: FacebookPost }> = ({ post }) => (
  <div className="flex items-center justify-between p-3">
    <div className="flex items-center space-x-3">
      <img
        src={post.user.avatar}
        alt={post.user.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-1">
          <span className="text-gray-800 text-sm font-semibold">{post.user.name}</span>
          {post.user.isVerified && <CheckCircle className="h-4 w-4 text-blue-500" />}
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-gray-500 text-xs">{post.timeAgo}</span>
          {post.isAd && (
            <span className="text-gray-500 text-xs">• Sponsored</span>
          )}
        </div>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <MoreHorizontal className="h-5 w-5 text-gray-500" />
    </div>
  </div>
);

const PostEngagement: React.FC<{
  post: FacebookPost;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}> = ({ post, onLike, onComment, onShare }) => (
  <div className="px-3 pb-3">
    {/* Engagement Stats */}
    <div className="flex items-center justify-between py-2 border-b border-gray-200 mb-2">
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-1">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
            <ThumbsUp className="h-3 w-3 text-white" />
          </div>
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">❤️</span>
          </div>
        </div>
        <span className="text-gray-600 text-sm">{post.engagement.likes}</span>
      </div>
      <div className="flex items-center space-x-4 text-gray-600 text-sm">
        <span>{post.engagement.comments} comments</span>
        <span>{post.engagement.shares} shares</span>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex items-center justify-around">
      <button
        onClick={onLike}
        className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center"
      >
        <ThumbsUp className="h-5 w-5 text-gray-600" />
        <span className="text-gray-700 text-sm font-medium">Like</span>
      </button>
      <button
        onClick={onComment}
        className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center"
      >
        <MessageCircle className="h-5 w-5 text-gray-600" />
        <span className="text-gray-700 text-sm font-medium">Comment</span>
      </button>
      <button
        onClick={onShare}
        className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors flex-1 justify-center"
      >
        <Share className="h-5 w-5 text-gray-600" />
        <span className="text-gray-700 text-sm font-medium">Share</span>
      </button>
    </div>
  </div>
);

const FacebookPostComponent: React.FC<{
  post: FacebookPost;
  onVideoPlay?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}> = ({ post, onVideoPlay, onLike, onComment, onShare }) => {
  const getAdBadgeColor = () => {
    if (!post.isAd) return '';
    return post.adType === 'turkish' ? 'from-yellow-400 to-orange-500' : 'from-red-500 to-red-600';
  };

  return (
    <div className="bg-white border-b border-gray-200 relative">
      {/* Ad Badge */}
      {post.isAd && (
        <div className="absolute top-2 right-2 z-10">
          <div className={`bg-gradient-to-r ${getAdBadgeColor()} px-2 py-1 rounded-full shadow-lg`}>
            <div className="flex items-center space-x-1">
              <Crown className="h-3 w-3 text-white" />
              <span className="text-white text-xs font-bold">
                Royal Video{post.adType === 'german' ? ' (DE)' : ''}
              </span>
            </div>
          </div>
        </div>
      )}

      <PostHeader post={post} />

      {/* Post Content */}
      {post.content.text && (
        <div className="px-3 pb-2">
          <p className="text-gray-800 text-sm leading-relaxed">{post.content.text}</p>
        </div>
      )}

      {/* Media */}
      {post.content.media && (
        <div className="aspect-video bg-gray-900 relative">
          {post.content.media.type === 'video' && post.content.media.videoData ? (
            <EnhancedVideoPlayer
              videoData={post.content.media.videoData}
              className="w-full h-full"
              onPlay={onVideoPlay}
              autoPlay={false}
              muted={true}
              loop={true}
            />
          ) : (
            <img
              src={post.content.media.url}
              alt="Post media"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      <PostEngagement
        post={post}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
      />
    </div>
  );
};

const FacebookBottomNav: React.FC = () => (
  <div className="bg-white border-t border-gray-200 px-2 py-1">
    <div className="flex items-center justify-around">
      <div className="flex flex-col items-center py-1">
        <Home className="h-6 w-6 text-[#1877F2]" />
        <span className="text-[#1877F2] text-xs font-medium">Home</span>
      </div>
      <div className="flex flex-col items-center py-1">
        <Play className="h-6 w-6 text-gray-500" />
        <span className="text-gray-500 text-xs">Reels</span>
      </div>
      <div className="flex flex-col items-center py-1">
        <Store className="h-6 w-6 text-gray-500" />
        <span className="text-gray-500 text-xs">Marketplace</span>
      </div>
      <div className="flex flex-col items-center py-1">
        <User className="h-6 w-6 text-gray-500" />
        <span className="text-gray-500 text-xs">Profile</span>
      </div>
      <div className="flex flex-col items-center py-1 relative">
        <Bell className="h-6 w-6 text-gray-500" />
        <span className="text-gray-500 text-xs">Notifications</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">9+</span>
        </div>
      </div>
      <div className="flex flex-col items-center py-1">
        <Menu className="h-6 w-6 text-gray-500" />
        <span className="text-gray-500 text-xs">Menu</span>
      </div>
    </div>
  </div>
);

export const FacebookInterface: React.FC<FacebookInterfaceProps> = ({
  posts,
  className = '',
  onVideoPlay,
  onLike,
  onComment,
  onShare,
}) => {
  return (
    <div className={`bg-gray-100 text-gray-800 h-full flex flex-col overflow-hidden ${className}`}>
      <div className="flex-shrink-0">
        <FacebookHeader />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide mobile-scroll mobile-text">
        <div className="pb-2">
          {posts.map((post) => (
            <FacebookPostComponent
              key={post.id}
              post={post}
              onVideoPlay={() => onVideoPlay?.(post.id)}
              onLike={() => onLike?.(post.id)}
              onComment={() => onComment?.(post.id)}
              onShare={() => onShare?.(post.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0">
        <FacebookBottomNav />
      </div>
    </div>
  );
};