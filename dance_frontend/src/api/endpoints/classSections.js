import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../client.js';
import { queryKeys } from '../queryKeys.js';

export const classSectionsApi = {
  getAll: (params = {}) => client.get('/class-sections/', params),
  getById: (id) => client.get(`/class-sections/${id}/`),
  getBySlug: (slug) => client.get(`/class-sections/slug/${slug}/`),
  create: (data) => client.post('/class-sections/', data),
  update: (id, data) => client.put(`/class-sections/${id}/`, data),
  patch: (id, data) => client.patch(`/class-sections/${id}/`, data),
  delete: (id) => client.delete(`/class-sections/${id}/`),
};

export const useClassList = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.classes.list(params),
    queryFn: () => classSectionsApi.getAll(params),
  });
};

export const useClass = (id) => {
  return useQuery({
    queryKey: queryKeys.classes.detail(id),
    queryFn: () => classSectionsApi.getById(id),
    enabled: !!id,
  });
};

export const useClassBySlug = (slug) => {
  return useQuery({
    queryKey: queryKeys.classes.bySlug(slug),
    queryFn: () => classSectionsApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: classSectionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.lists() });
    },
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => classSectionsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.detail(id) });
    },
  });
};

export const usePatchClass = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => classSectionsApi.patch(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.detail(id) });
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: classSectionsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.classes.lists() });
    },
  });
};