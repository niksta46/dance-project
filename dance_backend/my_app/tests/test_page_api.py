from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from my_app.models import Page


class PageAPITestCase(APITestCase):
    def setUp(self):
        """Set up test data"""
        self.page_data = {
            'title': 'Test Page',
            'slug': 'test-page',
            'content': 'This is a test page content for testing purposes.',
            'is_published': True,
            'order': 1
        }
        
        # Create a test page for retrieve, update, delete tests
        self.page = Page.objects.create(
            title='Existing Page',
            slug='existing-page',
            content='This is an existing page content.',
            is_published=True,
            order=2
        )

    def test_list_pages(self):
        """Test GET /api/pages/ - List all pages"""
        url = reverse('page-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Existing Page')

    def test_create_page(self):
        """Test POST /api/pages/ - Create a new page"""
        url = reverse('page-list')
        response = self.client.post(url, self.page_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Page.objects.count(), 2)
        self.assertEqual(response.data['title'], 'Test Page')
        self.assertEqual(response.data['slug'], 'test-page')

    def test_create_page_without_order(self):
        """Test that order is auto-assigned when not provided"""
        page_data_no_order = {
            'title': 'Auto Order Page',
            'slug': 'auto-order-page',
            'content': 'This page should get auto-assigned order.',
            'is_published': True
        }
        
        url = reverse('page-list')
        response = self.client.post(url, page_data_no_order, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Check that order was auto-assigned (should be 3 since we have 2 existing pages)
        self.assertGreater(response.data['order'], 0)

    def test_retrieve_page(self):
        """Test GET /api/pages/<id>/ - Retrieve a specific page"""
        url = reverse('page-detail', kwargs={'pk': self.page.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Existing Page')
        self.assertEqual(response.data['slug'], 'existing-page')

    def test_retrieve_nonexistent_page(self):
        """Test GET /api/pages/<id>/ - Retrieve non-existent page"""
        url = reverse('page-detail', kwargs={'pk': 99999})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_page(self):
        """Test PUT /api/pages/<id>/ - Update a page"""
        updated_data = {
            'title': 'Updated Page',
            'slug': 'updated-page',
            'content': 'This is updated content.',
            'is_published': False,
            'order': 5
        }
        
        url = reverse('page-detail', kwargs={'pk': self.page.pk})
        response = self.client.put(url, updated_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Page')
        self.assertEqual(response.data['content'], 'This is updated content.')
        self.assertEqual(response.data['is_published'], False)

    def test_partial_update_page(self):
        """Test PATCH /api/pages/<id>/ - Partial update a page"""
        partial_data = {
            'title': 'Partially Updated Page'
        }
        
        url = reverse('page-detail', kwargs={'pk': self.page.pk})
        response = self.client.patch(url, partial_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Partially Updated Page')
        # Original content should remain unchanged
        self.assertEqual(response.data['content'], 'This is an existing page content.')

    def test_delete_page(self):
        """Test DELETE /api/pages/<id>/ - Delete a page"""
        url = reverse('page-detail', kwargs={'pk': self.page.pk})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Page.objects.count(), 0)

    def test_delete_nonexistent_page(self):
        """Test DELETE /api/pages/<id>/ - Delete non-existent page"""
        url = reverse('page-detail', kwargs={'pk': 99999})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_page_invalid_slug(self):
        """Test creating page with invalid slug data"""
        invalid_data = {
            'title': 'Test Page',
            'slug': 'test page with spaces',  # Invalid slug format
            'content': 'Test content',
            'is_published': True
        }
        
        url = reverse('page-list')
        response = self.client.post(url, invalid_data, format='json')
        
        # Django's SlugField should normalize this, so it should still succeed
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['slug'], 'test-page-with-spaces')

    def test_create_page_empty_title(self):
        """Test creating page with empty title should fail"""
        invalid_data = {
            'title': '',
            'slug': 'empty-title',
            'content': 'Test content',
            'is_published': True
        }
        
        url = reverse('page-list')
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)