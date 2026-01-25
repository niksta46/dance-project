import client from './client.js';

export const socialLinksApi = {
  getAll: (params = {}) => client.get('/social-links/', params),
  getById: (id) => client.get(`/social-links/${id}/`),
  create: (data) => client.post('/social-links/', data),
  update: (id, data) => client.put(`/social-links/${id}/`, data),
  patch: (id, data) => client.patch(`/social-links/${id}/`, data),
  delete: (id) => client.delete(`/social-links/${id}/`),
};