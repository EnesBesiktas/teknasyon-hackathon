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
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDAiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGRkYwMCIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0ZGNzAwMCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjAwMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjRkY3MDAwIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      isVerified: true,
    },
    media: {
      type: 'video' as const,
      url: 'https://images.unsplash.com/photo-1506905925346-14b5e0c7e1b0?w=400&h=400&fit=crop&crop=center',
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
      username: 'sunset_photographer',
      displayName: 'Sunset Photographer',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQyKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDIiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGMDBGQyIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0ZGMDBGQyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjAwRkMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjRkYwMEZDIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
    },
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?fm=jpg&q=60&w=400&h=400&fit=crop&crop=center',
    },
    caption: '🌅 Bu akşamki gün batımı muhteşemdi! Gökyüzündeki renklerin dansı büyüleyiciydi. Doğanın sunduğu bu anları yakalamak için her gün farklı yerler keşfediyorum. Gün batımı fotoğrafçılığı sadece bir hobi değil, bir tutku! #günbatımı #sunset #fotograf #doğa #gökyüzü #renkler #photography #nature #sky #colors #beautiful #instagood #sunsetphotography #passion #art #photographer #landscape #goldenhour #magic #wonderful #amazing',
    likes: '4,523',
    comments: '287',
    timeAgo: '1h',
  },
  {
    id: '3',
    user: {
      username: 'royal_ads_de',
      displayName: 'Royal Ads Germany',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQxKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDEiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGMDAwMCIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0ZGYzAwMCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjAwMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjRkYwMDAwIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      isVerified: true,
    },
    media: {
      type: 'video' as const,
      url: 'https://images.unsplash.com/photo-1506905925346-14b5e0c7e1b0?w=400&h=400&fit=crop&crop=center',
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
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDAiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGRkYwMCIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0ZGNzAwMCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjAwMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjRkY3MDAwIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      isVerified: true,
    },
    content: {
      text: '🏰 Krallık reklamlarımızla hedef kitlenize ulaşın! Profesyonel video reklamlar ile işinizi büyütün.',
      media: {
        type: 'video' as const,
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
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
      name: 'AI Developer',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQzKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDMiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZGRiIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iIzAwRkZGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMEZGRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjMDBGRkZGIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
    },
    content: {
      text: '🤖 ChatGPT-5 ve yeni AI modelleri gerçekten devrim yaratıyor! Bugün yapay zeka ile kod yazma deneyimim inanılmazdı. AI artık sadece asistan değil, gerçek bir iş ortağı haline geldi. Gelecekte yazılım geliştirme nasıl olacak merak ediyorum. #AI #ChatGPT #yapayzeka #programming #coding #tech #innovation #future #software #development #machinelearning #artificialintelligence',
      media: {
        type: 'image' as const,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQoq8awIKhXX2akqkC96LHTeRKXEzmqhb0GQ&s',
      },
    },
    engagement: {
      likes: '3,456',
      comments: '234',
      shares: '89',
    },
    timeAgo: '2 hours ago',
  },
  {
    id: '3',
    user: {
      name: 'Royal Ads Germany',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQxKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDEiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGMDAwMCIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0ZGYzAwMCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjAwMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjRkYwMDAwIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      isVerified: true,
    },
    content: {
      text: '👑 Erreichen Sie Ihre Zielgruppe mit königlichen Anzeigen! Professionelle Videowerbung für Ihr Unternehmen.',
      media: {
        type: 'video' as const,
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
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
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
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
      name: 'Food Blogger',
      username: 'foodie_life',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQ0KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudDQiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGNzAwMCIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0ZGNzAwMCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjcwMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMTZIMjRWMjRIMTZWMTZaIiBmaWxsPSIjRkY3MDAwIi8+CjxwYXRoIGQ9Ik0xOCAxOEgyMlYyMkgxOFYxOFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
    },
    content: {
      text: '☕ Bu sabahki kahve deneyimi muhteşemdi! Yerel bir kahve dükkanında barista arkadaşımın özel blend\'i ile hazırladığı latte... Aroması hala burnumda! Kahve kültürü gerçekten bir sanat. Sizce en iyi kahve hangi şehirde? #kahve #coffee #barista #latte #aroma #taste #coffeeaddict #morning #caffeine #coffeelover #specialtycoffee #coffeeshop #local #artisan',
    },
    engagement: {
      replies: '47',
      retweets: '23',
      likes: '892',
      views: '3.2K',
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
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
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
            <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center mx-auto">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <p className="text-xs text-gray-300">Facebook</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center mx-auto">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <p className="text-xs text-gray-300">Instagram</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center mx-auto">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </div>
            <p className="text-xs text-gray-300">X/Twitter</p>
          </div>
        </div>

        {/* Fethet Button */}
        <div className="text-center">
          <button
            onClick={onVisionAwaken}
            className="
              relative group px-8 py-3 rounded-xl
              bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500
              hover:from-yellow-400 hover:via-orange-400 hover:to-red-400
              border-2 border-yellow-400
              shadow-lg hover:shadow-yellow-500/25 hover:shadow-2xl
              transition-all duration-300 transform
              hover:scale-105 hover:-translate-y-1
              active:scale-95
              focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-500/50
              overflow-hidden
            "
          >
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            {/* Button Content */}
            <div className="relative flex items-center justify-center space-x-2">
              <Crown className="h-5 w-5 text-white group-hover:animate-pulse" />
              <span className="text-white font-bold text-lg">FETHET</span>
              <Crown className="h-5 w-5 text-white group-hover:animate-pulse" />
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700" />
          </button>
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
      <div className="min-h-full flex flex-col justify-center p-3 space-y-3">
        <div className="text-center mb-3">
          <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-1" />
          <p className="text-xs text-gray-300 leading-tight mb-1">
            Kraliyet reklamlarınızı önizlemek için bir alan seçin
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Dijital alemde zafer sizi bekliyor
          </p>
        </div>

        <div className="space-y-1">
          <KingdomButton platform="facebook" onClick={() => onSelectPlatform('facebook')} className="transform scale-75" />
          <KingdomButton platform="instagram" onClick={() => onSelectPlatform('instagram')} className="transform scale-75" />
          <KingdomButton platform="twitter" onClick={() => onSelectPlatform('twitter')} className="transform scale-75" />
        </div>

        <div className="text-center pt-1">
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
    <div className={`mobile-container mobile-safe min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black ${className}`}>
      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center p-4 space-y-8">
        {/* iPhone Frame */}
        <IPhone15ProFrame>
          {renderPhoneContent()}
        </IPhone15ProFrame>

        {/* Vision Awaken Button - Temporary placement for testing (hidden when main screen has internal button) */}
        {state.currentView !== 'main' && (
          <div className="flex justify-center">
            <VisionAwakenButton onClick={handleVisionAwaken} />
          </div>
        )}
      </div>
    </div>
  );
};