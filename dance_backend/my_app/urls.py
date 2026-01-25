from django.urls import path
from . import views

urlpatterns = [
    path('pages/', views.PageAPIView.as_view(), name='page-list'),
    path('pages/<int:pk>/', views.PageDetailAPIView.as_view(), name='page-detail'),
    path('class-sections/', views.ClassSectionAPIView.as_view(), name='class-section-list'),
    path('class-sections/<int:pk>/', views.ClassSectionDetailAPIView.as_view(), name='class-section-detail'),
    path('news-posts/', views.NewsPostAPIView.as_view(), name='news-post-list'),
    path('news-posts/<int:pk>/', views.NewsPostDetailAPIView.as_view(), name='news-post-detail'),
    path('contact-messages/', views.ContactMessageAPIView.as_view(), name='contact-message-list'),
    path('contact-messages/<int:pk>/', views.ContactMessageDetailAPIView.as_view(), name='contact-message-detail'),
    path('social-links/', views.SocialLinkAPIView.as_view(), name='social-link-list'),
    path('social-links/<int:pk>/', views.SocialLinkDetailAPIView.as_view(), name='social-link-detail'),
    path('media-items/', views.MediaItemAPIView.as_view(), name='media-item-list'),
    path('media-items/<int:pk>/', views.MediaItemDetailAPIView.as_view(), name='media-item-detail'),
]