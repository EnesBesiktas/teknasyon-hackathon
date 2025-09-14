import { useState, useCallback, useMemo } from 'react';
import { VideoApi, type VideoUploadResponse, type VideoResponse, type ProcessingStatusResponse } from '../services/api/video';
import { useLocalStorage } from './useLocalStorage';

export interface UseVideoReturn {
  uploadVideo: (file: File, description?: string) => Promise<VideoUploadResponse>;
  getVideos: () => Promise<VideoResponse[]>;
  getVideo: (videoId: number) => Promise<VideoResponse>;
  getVideoStatus: (videoId: number) => Promise<ProcessingStatusResponse>;
  transcribeVideo: (videoId: number, languageHint?: string) => Promise<any>;
  deleteVideo: (videoId: number) => Promise<void>;
  pollVideoStatus: (
    videoId: number,
    onProgress?: (status: ProcessingStatusResponse) => void
  ) => Promise<ProcessingStatusResponse>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useVideo(): UseVideoReturn {
  const storage = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoApi = useMemo(() => new VideoApi(storage), [storage]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((err: unknown) => {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    setError(message);
    console.error('Video API error:', err);
  }, []);

  const uploadVideo = useCallback(async (file: File, description?: string): Promise<VideoUploadResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await videoApi.uploadVideo(file, description);
      return result;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [videoApi, handleError]);

  const getVideos = useCallback(async (): Promise<VideoResponse[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await videoApi.getVideos();
      return result;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [videoApi, handleError]);

  const getVideo = useCallback(async (videoId: number): Promise<VideoResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await videoApi.getVideo(videoId);
      return result;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [videoApi, handleError]);

  const getVideoStatus = useCallback(async (videoId: number): Promise<ProcessingStatusResponse> => {
    setError(null);
    try {
      return await videoApi.getVideoStatus(videoId);
    } catch (err) {
      handleError(err);
      throw err;
    }
  }, [videoApi, handleError]);

  const transcribeVideo = useCallback(async (videoId: number, languageHint?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await videoApi.transcribeVideo(videoId, languageHint);
      return result;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [videoApi, handleError]);

  const deleteVideo = useCallback(async (videoId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await videoApi.deleteVideo(videoId);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [videoApi, handleError]);

  const pollVideoStatus = useCallback(async (
    videoId: number,
    onProgress?: (status: ProcessingStatusResponse) => void
  ): Promise<ProcessingStatusResponse> => {
    setError(null);
    try {
      return await videoApi.pollVideoStatus(videoId, onProgress);
    } catch (err) {
      handleError(err);
      throw err;
    }
  }, [videoApi, handleError]);

  return {
    uploadVideo,
    getVideos,
    getVideo,
    getVideoStatus,
    transcribeVideo,
    deleteVideo,
    pollVideoStatus,
    isLoading,
    error,
    clearError,
  };
}