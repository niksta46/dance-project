import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from './client.js';
import { queryKeys } from '../queryKeys.js';

export const mediaItemsApi = {
  getAll: (params = {}) => client.get('/media-items/', params),
  getById: (id) => client.get(`/media-items/${id}/`),
  create: (data) => client.post('/media-items/', data),
  update: (id, data) => client.put(`/media-items/${id}/`, data),
  patch: (id, data) => client.patch(`/media-items/${id}/`, data),
  delete: (id) => client.delete(`/media-items/${id}/`),
};

export const useMediaItemsList = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.mediaItems.list(params),
    queryFn: () => mediaItemsApi.getAll(params),
  });
};

export const useMediaItem = (id) => {
  return useQuery({
    queryKey: queryKeys.mediaItems.detail(id),
    queryFn: () => mediaItemsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateMediaItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mediaItemsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaItems.lists() });
    },
  });
};

export const useUpdateMediaItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => mediaItemsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaItems.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaItems.detail(id) });
    },
  });
};

export const usePatchMediaItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => mediaItemsApi.patch(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaItems.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaItems.detail(id) });
    },
  });
};

export const useDeleteMediaItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mediaItemsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaItems.lists() });
    },
  });
};