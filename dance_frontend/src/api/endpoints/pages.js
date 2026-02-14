import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client.js';
import { queryKeys } from '../queryKeys.js';

export const pagesApi = {
  getAll: (params = {}) => client.get('/pages/', params),
  getById: (id) => client.get(`/pages/${id}/`),
  getBySlug: (slug) => client.get(`/pages/slug/${slug}/`),
  create: (data) => client.post('/pages/', data),
  update: (id, data) => client.put(`/pages/${id}/`, data),
  patch: (id, data) => client.patch(`/pages/${id}/`, data),
  delete: (id) => client.delete(`/pages/${id}/`),
};

export const usePagesList = (params = {}) => {
  const defaultParams = { exclude_slugs: 'contact,socialmedia', ...params };
  return useQuery({
    queryKey: queryKeys.pages.list(defaultParams),
    queryFn: () => pagesApi.getAll(defaultParams),
  });
};

export const usePage = (id) => {
  return useQuery({
    queryKey: queryKeys.pages.detail(id),
    queryFn: () => pagesApi.getById(id),
    enabled: !!id,
  });
};

export const usePageBySlug = (slug) => {
  return useQuery({
    queryKey: ['page', 'slug', slug],
    queryFn: () => pagesApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => pagesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.lists() });
    },
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => pagesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.detail(id) });
    },
  });
};

export const usePatchPage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => pagesApi.patch(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.detail(id) });
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => pagesApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.lists() });
      queryClient.removeQueries({queryKey: queryKeys.pages.detail(id)})
    },
  });
};