import client from './client.js';

export const pagesApi = {
  getAll: (params = {}) => client.get('/pages/', params),
  getById: (id) => client.get(`/pages/${id}/`),
  create: (data) => client.post('/pages/', data),
  update: (id, data) => client.put(`/pages/${id}/`, data),
  patch: (id, data) => client.patch(`/pages/${id}/`, data),
  delete: (id) => client.delete(`/pages/${id}/`),
};