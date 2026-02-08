import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from './client.js';
import { queryKeys } from '../queryKeys.js';

export const socialLinksApi = {
  getAll: (params = {}) => client.get('/social-links/', params),
  getById: (id) => client.get(`/social-links/${id}/`),
  create: (data) => client.post('/social-links/', data),
  update: (id, data) => client.put(`/social-links/${id}/`, data),
  patch: (id, data) => client.patch(`/social-links/${id}/`, data),
  delete: (id) => client.delete(`/social-links/${id}/`),
};

export const useSocialLinksList = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.socialLinks.list(params),
    queryFn: () => socialLinksApi.getAll(params),
  });
};

export const useSocialLink = (id) => {
  return useQuery({
    queryKey: queryKeys.socialLinks.detail(id),
    queryFn: () => socialLinksApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: socialLinksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.socialLinks.lists() });
    },
  });
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => socialLinksApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.socialLinks.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.socialLinks.detail(id) });
    },
  });
};

export const usePatchSocialLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => socialLinksApi.patch(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.socialLinks.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.socialLinks.detail(id) });
    },
  });
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: socialLinksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.socialLinks.lists() });
    },
  });
};