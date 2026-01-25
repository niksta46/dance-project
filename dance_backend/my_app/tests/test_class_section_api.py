from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from my_app.models import ClassSection


class ClassSectionAPITestCase(APITestCase):
    def setUp(self):
        """Set up test data"""
        self.class_section_data = {
            'name': 'Ballet Beginner',
            'description': 'Introduction to ballet for absolute beginners with no prior experience.',
            'age_group': '5-7 years',
            'level': 'Beginner',
            'schedule': 'Monday 4:00 PM - 5:00 PM',
            'is_active': True,
            'order': 1
        }
        
        # Create a test class section for retrieve, update, delete tests
        self.class_section = ClassSection.objects.create(
            name='Jazz Advanced',
            description='Advanced jazz techniques for experienced dancers.',
            age_group='13-18 years',
            level='Advanced',
            schedule='Wednesday 6:00 PM - 7:30 PM',
            is_active=True,
            order=2
        )

    def test_list_class_sections(self):
        """Test GET /api/class-sections/ - List all class sections"""
        url = reverse('class-section-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Jazz Advanced')

    def test_create_class_section(self):
        """Test POST /api/class-sections/ - Create a new class section"""
        url = reverse('class-section-list')
        response = self.client.post(url, self.class_section_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ClassSection.objects.count(), 2)
        self.assertEqual(response.data['name'], 'Ballet Beginner')
        self.assertEqual(response.data['level'], 'Beginner')

    def test_retrieve_class_section(self):
        """Test GET /api/class-sections/<id>/ - Retrieve a specific class section"""
        url = reverse('class-section-detail', kwargs={'pk': self.class_section.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Jazz Advanced')
        self.assertEqual(response.data['age_group'], '13-18 years')

    def test_retrieve_nonexistent_class_section(self):
        """Test GET /api/class-sections/<id>/ - Retrieve non-existent class section"""
        url = reverse('class-section-detail', kwargs={'pk': 99999})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_class_section(self):
        """Test PUT /api/class-sections/<id>/ - Update a class section"""
        updated_data = {
            'name': 'Updated Jazz Class',
            'description': 'Updated description for jazz class.',
            'age_group': '14-20 years',
            'level': 'Intermediate',
            'schedule': 'Thursday 5:00 PM - 6:30 PM',
            'is_active': False,
            'order': 3
        }
        
        url = reverse('class-section-detail', kwargs={'pk': self.class_section.pk})
        response = self.client.put(url, updated_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Updated Jazz Class')
        self.assertEqual(response.data['level'], 'Intermediate')
        self.assertEqual(response.data['is_active'], False)

    def test_partial_update_class_section(self):
        """Test PATCH /api/class-sections/<id>/ - Partial update a class section"""
        partial_data = {
            'name': 'Partially Updated Class',
            'is_active': False
        }
        
        url = reverse('class-section-detail', kwargs={'pk': self.class_section.pk})
        response = self.client.patch(url, partial_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Partially Updated Class')
        self.assertEqual(response.data['is_active'], False)
        # Original description should remain unchanged
        self.assertEqual(response.data['description'], 'Advanced jazz techniques for experienced dancers.')

    def test_delete_class_section(self):
        """Test DELETE /api/class-sections/<id>/ - Delete a class section"""
        url = reverse('class-section-detail', kwargs={'pk': self.class_section.pk})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ClassSection.objects.count(), 0)

    def test_delete_nonexistent_class_section(self):
        """Test DELETE /api/class-sections/<id>/ - Delete non-existent class section"""
        url = reverse('class-section-detail', kwargs={'pk': 99999})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_class_section_empty_name(self):
        """Test creating class section with empty name should fail"""
        invalid_data = {
            'name': '',
            'description': 'Test description',
            'age_group': '5-7 years',
            'level': 'Beginner',
            'schedule': 'Monday 4:00 PM',
            'is_active': True
        }
        
        url = reverse('class-section-list')
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_class_section_default_values(self):
        """Test creating class section with default values"""
        minimal_data = {
            'name': 'Hip Hop Basics',
            'description': 'Basic hip hop moves.',
            'age_group': '8-12 years',
            'level': 'Beginner',
            'schedule': 'Friday 3:00 PM - 4:00 PM'
        }
        
        url = reverse('class-section-list')
        response = self.client.post(url, minimal_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['is_active'], True)  # Default value
        self.assertEqual(response.data['order'], 0)  # Default value