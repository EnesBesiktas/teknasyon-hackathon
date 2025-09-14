import React, { useState, useCallback } from 'react';
import { ArrowLeft, Crown, Shield, Zap, Sparkles } from 'lucide-react';
import { IPhone15ProFrame } from '../../../mobile/devices/IPhone15ProFrame';
import { InstagramInterface } from '../../../mobile/platforms/InstagramInterface';
import { FacebookInterface } from '../../../mobile/platforms/FacebookInterface';
import { TwitterInterface } from '../../../mobile/platforms/TwitterInterface';
import { VisionAwakenButton } from '../../buttons/VisionAwakenButton';
import { KingdomButton } from '../../buttons/KingdomButton';
import type { PlatformType } from '../../buttons/KingdomButton';
import type { MobilePreviewProps, MobilePreviewState } from './types';

// Mock data for the social media previews
const mockVideoData = {
  turkish: {
    id: 'turkish-ad',
    title: 'Royal Turkish Advertisement',
    thumbnail: '/api/placeholder/400/300',
    duration: '0:30',
    views: '125K',
    sources: [
      { src: '/videos/turkish-ad.mp4', type: 'video/mp4' },
      { src: '/videos/turkish-ad.webm', type: 'video/webm' },
    ]
  },
  german: {
    id: 'german-ad',
    title: 'Royal German Advertisement',
    thumbnail: '/api/placeholder/400/300',
    duration: '0:45',
    views: '89K',
    sources: [
      { src: '/videos/german-ad.mp4', type: 'video/mp4' },
      { src: '/videos/german-ad.webm', type: 'video/webm' },
    ]
  }
};

const mockInstagramPosts = [
  {
    id: '1',
    user: {
      username: 'royal_ads_tr',
      displayName: 'Royal Ads Turkey',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
    },
    media: {
      type: 'video' as const,
      url: '/api/placeholder/400/400',
      videoData: mockVideoData.turkish,
    },
    caption: '🏰 Krallık reklamlarımızla hedef kitlenize ulaşın! #RoyalAds #Marketing',
    likes: '2,547',
    comments: '128',
    timeAgo: '2h',
    isAd: true,
    adType: 'turkish' as const,
  },
  {
    id: '2',
    user: {
      username: 'user_organic',
      displayName: 'Organic User',
      avatar: '/api/placeholder/40/40',
    },
    media: {
      type: 'image' as const,
      url: '/api/placeholder/400/400',
    },
    caption: 'Beautiful sunset today! ✨',
    likes: '42',
    comments: '3',
    timeAgo: '4h',
  },
  {
    id: '3',
    user: {
      username: 'royal_ads_de',
      displayName: 'Royal Ads Germany',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
    },
    media: {
      type: 'video' as const,
      url: '/api/placeholder/400/400',
      videoData: mockVideoData.german,
    },
    caption: '👑 Erreichen Sie Ihre Zielgruppe mit königlichen Anzeigen! #RoyalAds #Marketing',
    likes: '1,234',
    comments: '67',
    timeAgo: '6h',
    isAd: true,
    adType: 'german' as const,
  },
];

const mockFacebookPosts = [
  {
    id: '1',
    user: {
      name: 'Royal Ads Turkey',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
    },
    content: {
      text: '🏰 Krallık reklamlarımızla hedef kitlenize ulaşın! Profesyonel video reklamlar ile işinizi büyütün.',
      media: {
        type: 'video' as const,
        url: '/api/placeholder/600/400',
        videoData: mockVideoData.turkish,
      },
    },
    engagement: {
      likes: '2,547',
      comments: '128',
      shares: '45',
    },
    timeAgo: '2 hours ago',
    isAd: true,
    adType: 'turkish' as const,
  },
  {
    id: '2',
    user: {
      name: 'John Doe',
      avatar: '/api/placeholder/40/40',
    },
    content: {
      text: 'Had a great weekend with family! 🌞',
      media: {
        type: 'image' as const,
        url: '/api/placeholder/600/400',
      },
    },
    engagement: {
      likes: '42',
      comments: '8',
      shares: '2',
    },
    timeAgo: '4 hours ago',
  },
  {
    id: '3',
    user: {
      name: 'Royal Ads Germany',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
    },
    content: {
      text: '👑 Erreichen Sie Ihre Zielgruppe mit königlichen Anzeigen! Professionelle Videowerbung für Ihr Unternehmen.',
      media: {
        type: 'video' as const,
        url: '/api/placeholder/600/400',
        videoData: mockVideoData.german,
      },
    },
    engagement: {
      likes: '1,234',
      comments: '67',
      shares: '23',
    },
    timeAgo: '6 hours ago',
    isAd: true,
    adType: 'german' as const,
  },
];

const mockTwitterTweets = [
  {
    id: '1',
    user: {
      name: 'Royal Ads TR',
      username: 'royal_ads_tr',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
    },
    content: {
      text: '🏰 Krallık reklamlarımızla hedef kitlenize ulaşın! #RoyalAds #VideoMarketing #Turkey',
      media: {
        type: 'video' as const,
        url: '/api/placeholder/600/400',
        videoData: mockVideoData.turkish,
      },
    },
    engagement: {
      replies: '12',
      retweets: '45',
      likes: '187',
      views: '2.1K',
    },
    timeAgo: '2h',
    isAd: true,
    adType: 'turkish' as const,
  },
  {
    id: '2',
    user: {
      name: 'User Name',
      username: 'username',
      avatar: '/api/placeholder/40/40',
    },
    content: {
      text: 'Just had the best coffee ☕ Anyone else addicted to caffeine?',
    },
    engagement: {
      replies: '3',
      retweets: '1',
      likes: '12',
      views: '156',
    },
    timeAgo: '4h',
  },
  {
    id: '3',
    user: {
      name: 'Royal Ads DE',
      username: 'royal_ads_de',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
    },
    content: {
      text: '👑 Erreichen Sie Ihre Zielgruppe mit königlichen Anzeigen! #RoyalAds #VideoMarketing #Deutschland',
      media: {
        type: 'video' as const,
        url: '/api/placeholder/600/400',
        videoData: mockVideoData.german,
      },
    },
    engagement: {
      replies: '8',
      retweets: '23',
      likes: '98',
      views: '1.3K',
    },
    timeAgo: '6h',
    isAd: true,
    adType: 'german' as const,
  },
];

const MainScreen: React.FC<{ onVisionAwaken: () => void }> = ({ onVisionAwaken }) => (
  <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Sparkles className="absolute top-8 left-4 h-4 w-4 text-yellow-400 opacity-60 animate-pulse" />
      <Crown className="absolute top-16 right-6 h-6 w-6 text-orange-400 opacity-40 animate-bounce" style={{ animationDelay: '1s' }} />
      <Shield className="absolute bottom-24 left-3 h-5 w-5 text-red-400 opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
      <Zap className="absolute bottom-12 right-4 h-4 w-4 text-blue-400 opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }} />
    </div>

    {/* Scrollable content container */}
    <div className="flex-1 overflow-y-auto scrollbar-hide mobile-scroll mobile-text">
      <div className="min-h-full flex flex-col items-center justify-center p-6 pb-8 relative z-10">
        {/* Logo/Icon */}
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
          <Crown className="h-8 w-8 text-white" />
        </div>

        {/* Title */}
        <div className="space-y-3 text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text leading-tight">
            Iron Bank Sosyal Medya Önizleme
          </h1>
          <p className="text-base text-gray-300 leading-tight">
            Tüm Krallıklarda Kraliyet Reklamlarınız
          </p>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            Reklamlarınızın Facebook, Instagram ve X/Twitter'da nasıl görüneceğini gelişmiş simülasyon teknolojimizle önizleyin.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto text-center mb-6">
          <div className="space-y-2">
            <Shield className="h-6 w-6 text-blue-400 mx-auto" />
            <p className="text-xs text-gray-300">Facebook</p>
          </div>
          <div className="space-y-2">
            <Crown className="h-6 w-6 text-pink-400 mx-auto" />
            <p className="text-xs text-gray-300">Instagram</p>
          </div>
          <div className="space-y-2">
            <Zap className="h-6 w-6 text-gray-300 mx-auto" />
            <p className="text-xs text-gray-300">X/Twitter</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <VisionAwakenButton onClick={onVisionAwaken} />
          <p className="text-xs text-gray-500 mt-3 leading-relaxed">Dijital alemde zafer sizi bekliyor</p>
        </div>
      </div>
    </div>
  </div>
);

const KingdomSelection: React.FC<{ onSelectPlatform: (platform: PlatformType) => void; onBack: () => void }> = ({
  onSelectPlatform,
  onBack,
}) => (
  <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
    {/* Header */}
    <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-700">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Geri</span>
      </button>
      <h2 className="text-lg font-bold text-center">Krallığınızı Seçin</h2>
      <div className="w-14" />
    </div>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto scrollbar-hide mobile-scroll mobile-text">
      <div className="min-h-full flex flex-col justify-center p-4 space-y-6">
        <div className="text-center mb-6">
          <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
          <p className="text-base text-gray-300 leading-tight">
            Kraliyet reklamlarınızı önizlemek için bir alan seçin
          </p>
        </div>

        <div className="space-y-3">
          <KingdomButton platform="facebook" onClick={() => onSelectPlatform('facebook')} />
          <KingdomButton platform="instagram" onClick={() => onSelectPlatform('instagram')} />
          <KingdomButton platform="twitter" onClick={() => onSelectPlatform('twitter')} />
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 leading-relaxed">Her krallık fetih için eşsiz fırsatlar sunar</p>
        </div>
      </div>
    </div>
  </div>
);

export const MobilePreview: React.FC<MobilePreviewProps> = ({ className = '' }) => {
  const [state, setState] = useState<MobilePreviewState>({
    currentView: 'main',
    selectedPlatform: null,
    isLoading: false,
    videoData: mockVideoData,
    error: null,
  });

  const handleVisionAwaken = useCallback(() => {
    setState(prev => ({ ...prev, currentView: 'kingdom-selection' }));
  }, []);

  const handleBackToMain = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: 'main',
      selectedPlatform: null,
    }));
  }, []);

  const handleSelectPlatform = useCallback((platform: PlatformType) => {
    setState(prev => ({
      ...prev,
      selectedPlatform: platform,
      currentView: 'platform-view',
    }));
  }, []);

  const handleBackToKingdomSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentView: 'kingdom-selection',
      selectedPlatform: null,
    }));
  }, []);

  const renderPlatformContent = () => {
    if (!state.selectedPlatform) return null;

    const platformProps = {
      onVideoPlay: (id: string) => console.log('Video play:', id),
      onLike: (id: string) => console.log('Like:', id),
      onComment: (id: string) => console.log('Comment:', id),
      onShare: (id: string) => console.log('Share:', id),
    };

    switch (state.selectedPlatform) {
      case 'instagram':
        return <InstagramInterface posts={mockInstagramPosts} {...platformProps} />;
      case 'facebook':
        return <FacebookInterface posts={mockFacebookPosts} {...platformProps} />;
      case 'twitter':
        return (
          <TwitterInterface
            tweets={mockTwitterTweets}
            {...platformProps}
            onRetweet={(id: string) => console.log('Retweet:', id)}
            onReply={(id: string) => console.log('Reply:', id)}
          />
        );
      default:
        return null;
    }
  };

  const renderPhoneContent = () => {
    switch (state.currentView) {
      case 'main':
        return <MainScreen onVisionAwaken={handleVisionAwaken} />;
      case 'kingdom-selection':
        return <KingdomSelection onSelectPlatform={handleSelectPlatform} onBack={handleBackToMain} />;
      case 'platform-view':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-shrink-0 flex items-center justify-between p-3 bg-black border-b border-gray-800">
              <button
                onClick={handleBackToKingdomSelection}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Geri</span>
              </button>
              <div className="flex items-center space-x-2">
                {state.selectedPlatform === 'twitter' && (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                )}
              </div>
              <div className="w-14" />
            </div>
            <div className="flex-1 overflow-hidden">
              {renderPlatformContent()}
            </div>
          </div>
        );
      default:
        return <MainScreen onVisionAwaken={handleVisionAwaken} />;
    }
  };

  return (
    <div className={`mobile-container mobile-safe flex justify-center items-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black ${className}`}>
      <IPhone15ProFrame>
        {renderPhoneContent()}
      </IPhone15ProFrame>
    </div>
  );
};