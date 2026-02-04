import client from './client.js';

export const newsPostsApi = {
  getAll: (params = {}) => client.get('/news-posts/', params),
  getById: (id) => client.get(`/news-posts/${id}/`),
  create: (data) => client.post('/news-posts/', data),
  update: (id, data) => client.put(`/news-posts/${id}/`, data),
  patch: (id, data) => client.patch(`/news-posts/${id}/`, data),
  delete: (id) => client.delete(`/news-posts/${id}/`),
};