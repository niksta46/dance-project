import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client.js';
import { queryKeys } from '../queryKeys.js';

export const eventGalleriesApi = {
  getAll: (params = {}) => client.get('/event-galleries/', params),
  getById: (id) => client.get(`/event-galleries/${id}/`),
  getBySlug: (slug) => client.get(`/event-galleries/slug/${slug}/`),
  create: (data) => client.post('/event-galleries/', data),
  update: (id, data) => client.put(`/event-galleries/${id}/`, data),
  patch: (id, data) => client.patch(`/event-galleries/${id}/`, data),
  delete: (id) => client.delete(`/event-galleries/${id}/`),
};

export const useEventGalleriesList = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.eventGalleries.list(params),
    queryFn: () => eventGalleriesApi.getAll(params),
  });
};

export const useEventGallery = (id) => {
  return useQuery({
    queryKey: queryKeys.eventGalleries.detail(id),
    queryFn: () => eventGalleriesApi.getById(id),
    enabled: !!id,
  });
};

export const useEventGalleryBySlug = (slug) => {
  return useQuery({
    queryKey: queryKeys.eventGalleries.bySlug(slug),
    queryFn: () => eventGalleriesApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateEventGallery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => eventGalleriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.eventGalleries.lists() });
    },
  });
};

export const useUpdateEventGallery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => eventGalleriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.eventGalleries.lists() });
    },
  });
};

export const useDeleteEventGallery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => eventGalleriesApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.eventGalleries.lists() });
      queryClient.removeQueries({queryKey: queryKeys.eventGalleries.detail(id)})
    },
  });
};
