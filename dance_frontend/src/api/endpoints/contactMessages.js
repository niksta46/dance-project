import client from './client.js';

export const contactMessagesApi = {
  getAll: (params = {}) => client.get('/contact-messages/', params),
  getById: (id) => client.get(`/contact-messages/${id}/`),
  create: (data) => client.post('/contact-messages/', data),
  update: (id, data) => client.put(`/contact-messages/${id}/`, data),
  patch: (id, data) => client.patch(`/contact-messages/${id}/`, data),
  delete: (id) => client.delete(`/contact-messages/${id}/`),
};