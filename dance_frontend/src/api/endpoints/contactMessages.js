import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from './client.js';
import { queryKeys } from '../queryKeys.js';

export const contactMessagesApi = {
  getAll: (params = {}) => client.get('/contact-messages/', params),
  getById: (id) => client.get(`/contact-messages/${id}/`),
  create: (data) => client.post('/contact-messages/', data),
  update: (id, data) => client.put(`/contact-messages/${id}/`, data),
  patch: (id, data) => client.patch(`/contact-messages/${id}/`, data),
  delete: (id) => client.delete(`/contact-messages/${id}/`),
};

export const useContactMessagesList = (params = {}) => {
  return useQuery({
    queryKey: queryKeys.contactMessages.list(params),
    queryFn: () => contactMessagesApi.getAll(params),
  });
};

export const useContactMessage = (id) => {
  return useQuery({
    queryKey: queryKeys.contactMessages.detail(id),
    queryFn: () => contactMessagesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateContactMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactMessagesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contactMessages.lists() });
    },
  });
};

export const useUpdateContactMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => contactMessagesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contactMessages.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.contactMessages.detail(id) });
    },
  });
};

export const usePatchContactMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => contactMessagesApi.patch(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contactMessages.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.contactMessages.detail(id) });
    },
  });
};

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactMessagesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contactMessages.lists() });
    },
  });
};