import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, CheckCircle } from 'lucide-react';
import { EnhancedVideoPlayer } from '../../video/EnhancedVideoPlayer';
import type { InstagramInterfaceProps, InstagramPost } from './types';

const InstagramHeader: React.FC = () => (
  <div className="bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>
      <span className="text-white text-xl font-semibold">Instagram</span>
    </div>
    <div className="flex items-center space-x-4">
      <Heart className="h-6 w-6 text-white" />
      <MessageCircle className="h-6 w-6 text-white" />
    </div>
  </div>
);

const PostHeader: React.FC<{ post: InstagramPost }> = ({ post }) => (
  <div className="flex items-center justify-between p-3">
    <div className="flex items-center space-x-3">
      <img
        src={post.user.avatar}
        alt={post.user.username}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex items-center space-x-1">
        <span className="text-white text-sm font-semibold">{post.user.username}</span>
        {post.user.isVerified && <CheckCircle className="h-4 w-4 text-blue-500" />}
        {post.isAd && (
          <span className="text-gray-400 text-xs ml-1">• Sponsored</span>
        )}
      </div>
      {post.location && (
        <div className="text-gray-400 text-xs">
          • {post.location}
        </div>
      )}
    </div>
    <MoreHorizontal className="h-5 w-5 text-gray-400" />
  </div>
);

const PostActions: React.FC<{ post: InstagramPost; onLike?: () => void; onComment?: () => void; onShare?: () => void }> = ({
  post,
  onLike,
  onComment,
  onShare,
}) => (
  <div className="p-3">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-4">
        <button onClick={onLike} className="hover:scale-110 transition-transform">
          <Heart className="h-6 w-6 text-white hover:text-red-500" />
        </button>
        <button onClick={onComment} className="hover:scale-110 transition-transform">
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
        <button onClick={onShare} className="hover:scale-110 transition-transform">
          <Send className="h-6 w-6 text-white" />
        </button>
      </div>
      <Bookmark className="h-6 w-6 text-white hover:scale-110 transition-transform cursor-pointer" />
    </div>

    <div className="text-white text-sm font-semibold mb-1">
      {post.likes} likes
    </div>

    <div className="text-white text-sm mb-2">
      <span className="font-semibold">{post.user.username}</span>{' '}
      <span>{post.caption}</span>
    </div>

    <div className="text-gray-400 text-sm mb-2">
      View all {post.comments} comments
    </div>

    <div className="text-gray-400 text-xs uppercase">
      {post.timeAgo}
    </div>
  </div>
);

const InstagramPost: React.FC<{
  post: InstagramPost;
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
    <div className="bg-black border-b border-gray-900 relative">
      {/* Ad Badge */}
      {post.isAd && (
        <div className="absolute top-2 right-2 z-10">
          <div className={`bg-gradient-to-r ${getAdBadgeColor()} px-2 py-1 rounded-full`}>
          </div>
        </div>
      )}

      <PostHeader post={post} />

      {/* Media */}
      <div className="aspect-square bg-gray-900">
        {post.media.type === 'video' && post.media.videoData ? (
          <EnhancedVideoPlayer
            videoData={post.media.videoData}
            className="w-full h-full"
            onPlay={onVideoPlay}
            autoPlay={false}
            muted={true}
            loop={true}
          />
        ) : (
          <img
            src={post.media.url}
            alt="Post media"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Learn More Button for Ads */}
      {post.isAd && (
        <div className="px-4 py-2">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium">Learn more</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}

      <PostActions
        post={post}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
      />
    </div>
  );
};

export const InstagramInterface: React.FC<InstagramInterfaceProps> = ({
  posts,
  className = '',
  onVideoPlay,
  onLike,
  onComment,
  onShare,
}) => {
  return (
    <div className={`bg-black text-white h-full flex flex-col overflow-hidden ${className}`}>
      <div className="flex-shrink-0">
        <InstagramHeader />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide mobile-scroll mobile-text">
        <div className="pb-4">
          {posts.map((post) => (
            <InstagramPost
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
    </div>
  );
};