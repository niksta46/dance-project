from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from my_app.models import MediaItem


class MediaItemAPITestCase(APITestCase):
    def setUp(self):
        """Set up test data"""
        self.photo_data = {
            'media_type': 'photo',
            'title': 'Summer Dance Performance',
            'video_url': '',
            'is_published': True
        }
        
        self.video_data = {
            'media_type': 'video',
            'title': 'Ballet Class Rehearsal',
            'video_url': 'https://youtube.com/watch?v=example123',
            'is_published': True
        }
        
        # Create a test photo for retrieve, update, delete tests
        self.photo_item = MediaItem.objects.create(
            media_type='photo',
            title='Spring Recital 2024',
            is_published=True
        )
        
        # Create a test video for testing
        self.video_item = MediaItem.objects.create(
            media_type='video',
            title='Jazz Performance',
            video_url='https://vimeo.com/example456',
            is_published=False
        )

    def test_list_media_items(self):
        """Test GET /api/media-items/ - List all media items"""
        url = reverse('media-item-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        titles = [item['title'] for item in response.data]
        self.assertIn('Spring Recital 2024', titles)
        self.assertIn('Jazz Performance', titles)

    def test_create_photo_media_item(self):
        """Test POST /api/media-items/ - Create a photo media item"""
        url = reverse('media-item-list')
        response = self.client.post(url, self.photo_data, format='json')
        
        # This should fail because photo requires image
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Image is required for photo media type', str(response.data))

    def test_create_video_media_item(self):
        """Test POST /api/media-items/ - Create a video media item"""
        url = reverse('media-item-list')
        response = self.client.post(url, self.video_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MediaItem.objects.count(), 3)
        self.assertEqual(response.data['media_type'], 'video')
        self.assertEqual(response.data['title'], 'Ballet Class Rehearsal')

    def test_retrieve_media_item(self):
        """Test GET /api/media-items/<id>/ - Retrieve a specific media item"""
        url = reverse('media-item-detail', kwargs={'pk': self.photo_item.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Spring Recital 2024')
        self.assertEqual(response.data['media_type'], 'photo')

    def test_retrieve_nonexistent_media_item(self):
        """Test GET /api/media-items/<id>/ - Retrieve non-existent media item"""
        url = reverse('media-item-detail', kwargs={'pk': 99999})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_photo_media_item(self):
        """Test PUT /api/media-items/<id>/ - Update a photo media item"""
        updated_data = {
            'media_type': 'photo',
            'title': 'Updated Spring Recital',
            'video_url': '',
            'is_published': False
        }
        
        url = reverse('media-item-detail', kwargs={'pk': self.photo_item.pk})
        response = self.client.put(url, updated_data, format='json')
        
        # Should fail because photo without image
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_video_media_item(self):
        """Test PUT /api/media-items/<id>/ - Update a video media item"""
        updated_data = {
            'media_type': 'video',
            'title': 'Updated Jazz Performance',
            'video_url': 'https://youtube.com/watch?v=updated789',
            'is_published': True
        }
        
        url = reverse('media-item-detail', kwargs={'pk': self.video_item.pk})
        response = self.client.put(url, updated_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Jazz Performance')
        self.assertEqual(response.data['is_published'], True)

    def test_partial_update_media_item(self):
        """Test PATCH /api/media-items/<id>/ - Partial update a media item"""
        partial_data = {
            'title': 'Partially Updated Title',
            'is_published': False
        }
        
        url = reverse('media-item-detail', kwargs={'pk': self.video_item.pk})
        response = self.client.patch(url, partial_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Partially Updated Title')
        self.assertEqual(response.data['is_published'], False)

    def test_delete_media_item(self):
        """Test DELETE /api/media-items/<id>/ - Delete a media item"""
        url = reverse('media-item-detail', kwargs={'pk': self.photo_item.pk})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(MediaItem.objects.count(), 1)

    def test_delete_nonexistent_media_item(self):
        """Test DELETE /api/media-items/<id>/ - Delete non-existent media item"""
        url = reverse('media-item-detail', kwargs={'pk': 99999})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_photo_with_video_url_should_fail(self):
        """Test creating photo with video_url should fail"""
        invalid_photo_data = {
            'media_type': 'photo',
            'title': 'Invalid Photo',
            'video_url': 'https://youtube.com/watch?v=invalid',
            'is_published': True
        }
        
        url = reverse('media-item-list')
        response = self.client.post(url, invalid_photo_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Video URL should not be provided for photo media type', str(response.data))

    def test_video_without_video_url_should_fail(self):
        """Test creating video without video_url should fail"""
        invalid_video_data = {
            'media_type': 'video',
            'title': 'Invalid Video',
            'video_url': '',
            'is_published': True
        }
        
        url = reverse('media-item-list')
        response = self.client.post(url, invalid_video_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Video URL is required for video media type', str(response.data))

    def test_video_with_invalid_url_should_fail(self):
        """Test creating video with invalid URL should fail"""
        invalid_url_video_data = {
            'media_type': 'video',
            'title': 'Video with Invalid URL',
            'video_url': 'invalid-url-format',
            'is_published': True
        }
        
        url = reverse('media-item-list')
        response = self.client.post(url, invalid_url_video_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Video URL must start with http:// or https://', str(response.data))

    def test_media_item_without_title(self):
        """Test creating media item without title (should be optional)"""
        no_title_data = {
            'media_type': 'video',
            'title': '',
            'video_url': 'https://youtube.com/watch?v=notitle',
            'is_published': True
        }
        
        url = reverse('media-item-list')
        response = self.client.post(url, no_title_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], '')

    def test_media_item_default_values(self):
        """Test creating media item with default values"""
        minimal_data = {
            'media_type': 'video',
            'title': 'Minimal Video',
            'video_url': 'https://youtube.com/watch?v=minimal'
        }
        
        url = reverse('media-item-list')
        response = self.client.post(url, minimal_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['is_published'], True)  # Default value