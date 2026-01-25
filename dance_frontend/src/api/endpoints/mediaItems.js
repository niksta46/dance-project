import client from './client.js';

export const mediaItemsApi = {
  getAll: (params = {}) => client.get('/media-items/', params),
  getById: (id) => client.get(`/media-items/${id}/`),
  create: (data) => client.post('/media-items/', data),
  update: (id, data) => client.put(`/media-items/${id}/`, data),
  patch: (id, data) => client.patch(`/media-items/${id}/`, data),
  delete: (id) => client.delete(`/media-items/${id}/`),
};