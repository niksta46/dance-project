from django.urls import path
from . import views

urlpatterns = [
    path('pages/', views.PageAPIView.as_view(), name='page-list'),
    path('pages/slug/<str:slug>/', views.PageBySlugAPIView.as_view(), name='page-by-slug'),
    path('pages/<int:pk>/', views.PageDetailAPIView.as_view(), name='page-detail'),
    path('class-sections/', views.ClassSectionAPIView.as_view(), name='class-section-list'),
    path('class-sections/slug/<str:slug>/', views.ClassSectionBySlugAPIView.as_view(), name='class-section-by-slug'),
    path('class-sections/<int:pk>/', views.ClassSectionDetailAPIView.as_view(), name='class-section-detail'),
    path('news-posts/', views.NewsPostAPIView.as_view(), name='news-post-list'),
    path('news-posts/slug/<str:slug>/', views.NewsPostBySlugAPIView.as_view(), name='news-post-by-slug'),
    path('news-posts/<int:pk>/', views.NewsPostDetailAPIView.as_view(), name='news-post-detail'),
    path('contact-messages/', views.ContactMessageAPIView.as_view(), name='contact-message-list'),
    path('contact-messages/<int:pk>/', views.ContactMessageDetailAPIView.as_view(), name='contact-message-detail'),
    path('social-links/', views.SocialLinkAPIView.as_view(), name='social-link-list'),
    path('social-links/<int:pk>/', views.SocialLinkDetailAPIView.as_view(), name='social-link-detail'),
    path('media-items/', views.MediaItemAPIView.as_view(), name='media-item-list'),
    path('media-items/<int:pk>/', views.MediaItemDetailAPIView.as_view(), name='media-item-detail'),
    path('event-galleries/', views.EventGalleryAPIView.as_view(), name='event-gallery-list'),
    path('event-galleries/slug/<str:slug>/', views.EventGalleryBySlugAPIView.as_view(), name='event-gallery-by-slug'),
    path('event-galleries/<int:pk>/', views.EventGalleryDetailAPIView.as_view(), name='event-gallery-detail'),
]