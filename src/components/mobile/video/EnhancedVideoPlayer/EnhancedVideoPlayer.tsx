import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Crown, Loader2 } from 'lucide-react';
import type { VideoPlayerProps, VideoPlayerState } from './types';

export const EnhancedVideoPlayer: React.FC<VideoPlayerProps> = ({
  videoData,
  isLoading = false,
  error,
  className = '',
  autoPlay = false,
  muted = true,
  loop = true,
  onPlay,
  onPause,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: muted,
    isFullscreen: false,
    isLoading: isLoading,
    error: null,
  });

  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<number>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setState(prev => ({
        ...prev,
        duration: video.duration,
        isLoading: false,
      }));
    };

    const handleTimeUpdate = () => {
      setState(prev => ({
        ...prev,
        currentTime: video.currentTime,
      }));
    };

    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true }));
      onPlay?.();
    };

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
      onPause?.();
    };

    const handleError = () => {
      const errorMessage = 'Failed to load video';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      onError?.(errorMessage);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [onPlay, onPause, onError]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (state.isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => {
        console.error('Error playing video:', err);
        setState(prev => ({ ...prev, error: 'Failed to play video' }));
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setState(prev => ({ ...prev, isMuted: video.muted }));
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (error || state.error) {
    return (
      <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-center">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Video unavailable</p>
            <p className="text-gray-500 text-xs">{error || state.error}</p>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/70 rounded px-2 py-1">
          <span className="text-white text-xs font-medium">
            {videoData.duration}
          </span>
        </div>
      </div>
    );
  }

  if (isLoading || state.isLoading) {
    return (
      <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Loading video...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-black rounded-lg overflow-hidden group hover:scale-[1.02] transition-transform duration-200 ${className}`}
      onMouseEnter={showControlsTemporarily}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        poster={videoData.thumbnail}
      >
        {videoData.sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>

      {/* Duration Badge */}
      <div className="absolute top-2 right-2 bg-black/70 rounded px-2 py-1">
        <span className="text-white text-xs font-medium">
          {videoData.duration}
        </span>
      </div>

      {/* Play Button Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-200 cursor-pointer ${
          state.isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={togglePlay}
      >
        <div className="bg-black/70 rounded-full p-3 hover:bg-black/80 transition-colors hover:scale-110 transform duration-200">
          {state.isPlaying ? (
            <Pause className="h-6 w-6 text-white" />
          ) : (
            <Play className="h-6 w-6 text-white ml-1" />
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-200 ${
        showControls || !state.isPlaying ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlay}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {state.isPlaying ? (
                <Pause className="h-4 w-4 text-white" />
              ) : (
                <Play className="h-4 w-4 text-white" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {state.isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </button>
          </div>

          <div className="text-white text-xs">
            {formatTime(state.currentTime)} / {formatTime(state.duration)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-yellow-400 transition-all duration-100"
            style={{
              width: state.duration ? `${(state.currentTime / state.duration) * 100}%` : '0%'
            }}
          />
        </div>
      </div>
    </div>
  );
};