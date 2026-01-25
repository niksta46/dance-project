from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
from my_app.models import NewsPost


class NewsPostAPITestCase(APITestCase):
    def setUp(self):
        """Set up test data"""
        self.news_post_data = {
            'title': 'Summer Dance Camp Registration Open',
            'slug': 'summer-dance-camp-registration',
            'body': 'We are excited to announce that registration for our summer dance camp is now open. Join us for an amazing summer of dance and fun!',
            'published_at': timezone.now(),
            'is_published': True
        }
        
        # Create a test news post for retrieve, update, delete tests
        self.news_post = NewsPost.objects.create(
            title='Spring Recital Announcement',
            slug='spring-recital-announcement',
            body='Our annual spring recital will be held on June 15th at the community theater.',
            published_at=timezone.now() - timezone.timedelta(days=1),
            is_published=True
        )

    def test_list_news_posts(self):
        """Test GET /api/news-posts/ - List all news posts"""
        url = reverse('news-post-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Spring Recital Announcement')

    def test_create_news_post(self):
        """Test POST /api/news-posts/ - Create a new news post"""
        url = reverse('news-post-list')
        response = self.client.post(url, self.news_post_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(NewsPost.objects.count(), 2)
        self.assertEqual(response.data['title'], 'Summer Dance Camp Registration Open')
        self.assertEqual(response.data['is_published'], True)

    def test_create_news_post_without_image(self):
        """Test creating news post without image (should be optional)"""
        data_without_image = {
            'title': 'New Teacher Announcement',
            'slug': 'new-teacher-announcement',
            'body': 'We welcome our new dance instructor to the team!',
            'published_at': timezone.now(),
            'is_published': True
        }
        
        url = reverse('news-post-list')
        response = self.client.post(url, data_without_image, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['image'], None)

    def test_retrieve_news_post(self):
        """Test GET /api/news-posts/<id>/ - Retrieve a specific news post"""
        url = reverse('news-post-detail', kwargs={'pk': self.news_post.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Spring Recital Announcement')
        self.assertEqual(response.data['slug'], 'spring-recital-announcement')

    def test_retrieve_nonexistent_news_post(self):
        """Test GET /api/news-posts/<id>/ - Retrieve non-existent news post"""
        url = reverse('news-post-detail', kwargs={'pk': 99999})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_news_post(self):
        """Test PUT /api/news-posts/<id>/ - Update a news post"""
        updated_data = {
            'title': 'Updated Spring Recital Date',
            'slug': 'updated-spring-recital-date',
            'body': 'The spring recital date has been changed to June 22nd.',
            'published_at': timezone.now(),
            'is_published': False
        }
        
        url = reverse('news-post-detail', kwargs={'pk': self.news_post.pk})
        response = self.client.put(url, updated_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Spring Recital Date')
        self.assertEqual(response.data['is_published'], False)

    def test_partial_update_news_post(self):
        """Test PATCH /api/news-posts/<id>/ - Partial update a news post"""
        partial_data = {
            'title': 'Partially Updated Title',
            'is_published': False
        }
        
        url = reverse('news-post-detail', kwargs={'pk': self.news_post.pk})
        response = self.client.patch(url, partial_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Partially Updated Title')
        self.assertEqual(response.data['is_published'], False)
        # Original body should remain unchanged
        self.assertIn('annual spring recital', response.data['body'])

    def test_delete_news_post(self):
        """Test DELETE /api/news-posts/<id>/ - Delete a news post"""
        url = reverse('news-post-detail', kwargs={'pk': self.news_post.pk})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(NewsPost.objects.count(), 0)

    def test_delete_nonexistent_news_post(self):
        """Test DELETE /api/news-posts/<id>/ - Delete non-existent news post"""
        url = reverse('news-post-detail', kwargs={'pk': 99999})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_news_post_empty_title(self):
        """Test creating news post with empty title should fail"""
        invalid_data = {
            'title': '',
            'slug': 'empty-title',
            'body': 'Test body content',
            'published_at': timezone.now(),
            'is_published': True
        }
        
        url = reverse('news-post-list')
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_news_post_slug_normalization(self):
        """Test that slug is normalized to lowercase"""
        data_with_uppercase_slug = {
            'title': 'Test Post',
            'slug': 'TEST-SLUG-WITH-UPPERCASE',
            'body': 'Test body content',
            'published_at': timezone.now(),
            'is_published': True
        }
        
        url = reverse('news-post-list')
        response = self.client.post(url, data_with_uppercase_slug, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['slug'], 'test-slug-with-uppercase')

    def test_news_post_default_values(self):
        """Test creating news post with default values"""
        minimal_data = {
            'title': 'Minimal Post',
            'slug': 'minimal-post',
            'body': 'Minimal body content'
        }
        
        url = reverse('news-post-list')
        response = self.client.post(url, minimal_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['is_published'], True)  # Default value