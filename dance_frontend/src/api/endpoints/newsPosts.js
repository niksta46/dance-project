import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from './client.js';
import { queryKeys } from '../queryKeys.js';

export const newsPostsApi = {
  getAll: (params = {}) => client.get('/news-posts/', params),
  getById: (id) => client.get(`/news-posts/${id}/`),
  create: (data) => client.post('/news-posts/', data),
  update: (id, data) => client.put(`/news-posts/${id}/`, data),
  patch: (id, data) => client.patch(`/news-posts/${id}/`, data),
  delete: (id) => client.delete(`/news-posts/${id}/`),
};

export const useNewsList = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.news.list(params),
    queryFn: () => newsPostsApi.getAll(params),
  });
};

export const useNewsPost = (id) => {
  return useQuery({
    queryKey: queryKeys.news.detail(id),
    queryFn: () => newsPostsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateNewsPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: newsPostsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news.lists() });
    },
  });
};

export const useUpdateNewsPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => newsPostsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.news.detail(id) });
    },
  });
};

export const usePatchNewsPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => newsPostsApi.patch(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.news.detail(id) });
    },
  });
};

export const useDeleteNewsPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: newsPostsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.news.lists() });
    },
  });
};