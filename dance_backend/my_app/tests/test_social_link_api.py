from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from my_app.models import SocialLink


class SocialLinkAPITestCase(APITestCase):
    def setUp(self):
        """Set up test data"""
        self.social_link_data = {
            'platform': 'Instagram',
            'url': 'https://instagram.com/dancestudio',
            'is_active': True,
            'order': 1
        }
        
        # Create a test social link for retrieve, update, delete tests
        self.social_link = SocialLink.objects.create(
            platform='Facebook',
            url='https://facebook.com/dancestudio',
            is_active=True,
            order=2
        )

    def test_list_social_links(self):
        """Test GET /api/social-links/ - List all social links"""
        url = reverse('social-link-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['platform'], 'Facebook')
        self.assertEqual(response.data[0]['url'], 'https://facebook.com/dancestudio')

    def test_create_social_link(self):
        """Test POST /api/social-links/ - Create a new social link"""
        url = reverse('social-link-list')
        response = self.client.post(url, self.social_link_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SocialLink.objects.count(), 2)
        self.assertEqual(response.data['platform'], 'Instagram')
        self.assertEqual(response.data['url'], 'https://instagram.com/dancestudio')

    def test_retrieve_social_link(self):
        """Test GET /api/social-links/<id>/ - Retrieve a specific social link"""
        url = reverse('social-link-detail', kwargs={'pk': self.social_link.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['platform'], 'Facebook')
        self.assertEqual(response.data['is_active'], True)

    def test_retrieve_nonexistent_social_link(self):
        """Test GET /api/social-links/<id>/ - Retrieve non-existent social link"""
        url = reverse('social-link-detail', kwargs={'pk': 99999})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_social_link(self):
        """Test PUT /api/social-links/<id>/ - Update a social link"""
        updated_data = {
            'platform': 'Twitter',
            'url': 'https://twitter.com/dancestudio',
            'is_active': False,
            'order': 3
        }
        
        url = reverse('social-link-detail', kwargs={'pk': self.social_link.pk})
        response = self.client.put(url, updated_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['platform'], 'Twitter')
        self.assertEqual(response.data['is_active'], False)

    def test_partial_update_social_link(self):
        """Test PATCH /api/social-links/<id>/ - Partial update a social link"""
        partial_data = {
            'is_active': False
        }
        
        url = reverse('social-link-detail', kwargs={'pk': self.social_link.pk})
        response = self.client.patch(url, partial_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['is_active'], False)
        # Original platform should remain unchanged
        self.assertEqual(response.data['platform'], 'Facebook')

    def test_delete_social_link(self):
        """Test DELETE /api/social-links/<id>/ - Delete a social link"""
        url = reverse('social-link-detail', kwargs={'pk': self.social_link.pk})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(SocialLink.objects.count(), 0)

    def test_delete_nonexistent_social_link(self):
        """Test DELETE /api/social-links/<id>/ - Delete non-existent social link"""
        url = reverse('social-link-detail', kwargs={'pk': 99999})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_social_link_empty_platform(self):
        """Test creating social link with empty platform should fail"""
        invalid_data = {
            'platform': '',
            'url': 'https://example.com',
            'is_active': True
        }
        
        url = reverse('social-link-list')
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_social_link_invalid_url(self):
        """Test creating social link with invalid URL should fail"""
        invalid_data = {
            'platform': 'Test Platform',
            'url': 'invalid-url-format',
            'is_active': True
        }
        
        url = reverse('social-link-list')
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_social_link_https_url(self):
        """Test creating social link with https URL should succeed"""
        https_data = {
            'platform': 'LinkedIn',
            'url': 'https://linkedin.com/company/dancestudio',
            'is_active': True
        }
        
        url = reverse('social-link-list')
        response = self.client.post(url, https_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['platform'], 'LinkedIn')

    def test_create_social_link_http_url(self):
        """Test creating social link with http URL should succeed"""
        http_data = {
            'platform': 'Website',
            'url': 'http://dancestudio.com',
            'is_active': True
        }
        
        url = reverse('social-link-list')
        response = self.client.post(url, http_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['platform'], 'Website')

    def test_social_link_default_values(self):
        """Test creating social link with default values"""
        minimal_data = {
            'platform': 'YouTube',
            'url': 'https://youtube.com/dancestudio'
        }
        
        url = reverse('social-link-list')
        response = self.client.post(url, minimal_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['is_active'], True)  # Default value
        self.assertEqual(response.data['order'], 0)  # Default value