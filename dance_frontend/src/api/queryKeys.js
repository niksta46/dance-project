export const queryKeys = {
  pages: {
    all: ['pages'],
    lists: () => [...queryKeys.pages.all, 'list'],
    list: (params) => [...queryKeys.pages.lists(), params],
    details: () => [...queryKeys.pages.all, 'detail'],
    detail: (id) => [...queryKeys.pages.details(), id],
  },
  news: {
    all: ['news'],
    lists: () => [...queryKeys.news.all, 'list'],
    list: (params) => [...queryKeys.news.lists(), params],
    details: () => [...queryKeys.news.all, 'detail'],
    detail: (id) => [...queryKeys.news.details(), id],
  },
  classes: {
    all: ['classes'],
    lists: () => [...queryKeys.classes.all, 'list'],
    list: (params) => [...queryKeys.classes.lists(), params],
    details: () => [...queryKeys.classes.all, 'detail'],
    detail: (id) => [...queryKeys.classes.details(), id],
  },
  contactMessages: {
    all: ['contactMessages'],
    lists: () => [...queryKeys.contactMessages.all, 'list'],
    list: (params) => [...queryKeys.contactMessages.lists(), params],
    details: () => [...queryKeys.contactMessages.all, 'detail'],
    detail: (id) => [...queryKeys.contactMessages.details(), id],
  },
  socialLinks: {
    all: ['socialLinks'],
    lists: () => [...queryKeys.socialLinks.all, 'list'],
    list: (params) => [...queryKeys.socialLinks.lists(), params],
    details: () => [...queryKeys.socialLinks.all, 'detail'],
    detail: (id) => [...queryKeys.socialLinks.details(), id],
  },
  mediaItems: {
    all: ['mediaItems'],
    lists: () => [...queryKeys.mediaItems.all, 'list'],
    list: (params) => [...queryKeys.mediaItems.lists(), params],
    details: () => [...queryKeys.mediaItems.all, 'detail'],
    detail: (id) => [...queryKeys.mediaItems.details(), id],
  },
}
