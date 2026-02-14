import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client.js';
import { queryKeys } from '../queryKeys.js';

export const pagesApi = {
  getAll: (params = {}) => client.get('/pages/', params),
  getById: (id) => client.get(`/pages/${id}/`),
  create: (data) => client.post('/pages/', data),
  update: (id, data) => client.put(`/pages/${id}/`, data),
  patch: (id, data) => client.patch(`/pages/${id}/`, data),
  delete: (id) => client.delete(`/pages/${id}/`),
};

export const usePagesList = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.pages.list(params),
    queryFn: () => pagesApi.getAll(params),
  });
};

export const usePage = (id) => {
  return useQuery({
    queryKey: queryKeys.pages.detail(id),
    queryFn: () => pagesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pagesApi.create,
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
    mutationFn: pagesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.lists() });
    },
  });
};