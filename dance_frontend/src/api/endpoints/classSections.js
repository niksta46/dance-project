import client from './client.js';

export const classSectionsApi = {
  getAll: (params = {}) => client.get('/class-sections/', params),
  getById: (id) => client.get(`/class-sections/${id}/`),
  create: (data) => client.post('/class-sections/', data),
  update: (id, data) => client.put(`/class-sections/${id}/`, data),
  patch: (id, data) => client.patch(`/class-sections/${id}/`, data),
  delete: (id) => client.delete(`/class-sections/${id}/`),
};