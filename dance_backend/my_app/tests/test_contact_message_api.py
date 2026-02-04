from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from my_app.models import ContactMessage


class ContactMessageAPITestCase(APITestCase):
    def setUp(self):
        """Set up test data"""
        self.contact_message_data = {
            'name': 'John Doe',
            'email': 'john.doe@example.com',
            'phone': '+1-555-123-4567',
            'subject': 'Dance Class Inquiry',
            'message': 'I am interested in enrolling my daughter in ballet classes. Could you please provide information about the beginner classes for 6-year-olds?'
        }
        
        # Create a test contact message for retrieve, update, delete tests
        self.contact_message = ContactMessage.objects.create(
            name='Jane Smith',
            email='jane.smith@example.com',
            phone='+1-555-987-6543',
            subject='Performance Schedule',
            message='When is the next performance scheduled for the advanced jazz class?',
            is_read=False
        )

    def test_list_contact_messages(self):
        """Test GET /api/contact-messages/ - List all contact messages"""
        url = reverse('contact-message-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Jane Smith')
        self.assertEqual(response.data[0]['email'], 'jane.smith@example.com')

    def test_create_contact_message(self):
        """Test POST /api/contact-messages/ - Create a new contact message"""
        url = reverse('contact-message-list')
        response = self.client.post(url, self.contact_message_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 2)
        self.assertEqual(response.data['name'], 'John Doe')
        self.assertEqual(response.data['email'], 'john.doe@example.com')
        self.assertEqual(response.data['subject'], 'Dance Class Inquiry')

    def test_create_contact_message_without_phone(self):
        """Test creating contact message without phone (should be optional)"""
        data_without_phone = {
            'name': 'Alice Johnson',
            'email': 'alice.johnson@example.com',
            'subject': 'General Information',
            'message': 'I would like to receive information about your dance programs.'
        }
        
        url = reverse('contact-message-list')
        response = self.client.post(url, data_without_phone, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['phone'], '')

    def test_retrieve_contact_message(self):
        """Test GET /api/contact-messages/<id>/ - Retrieve a specific contact message"""
        url = reverse('contact-message-detail', kwargs={'pk': self.contact_message.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Jane Smith')
        self.assertEqual(response.data['subject'], 'Performance Schedule')
        self.assertEqual(response.data['is_read'], False)

    def test_retrieve_nonexistent_contact_message(self):
        """Test GET /api/contact-messages/<id>/ - Retrieve non-existent contact message"""
        url = reverse('contact-message-detail', kwargs={'pk': 99999})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_contact_message(self):
        """Test PUT /api/contact-messages/<id>/ - Update a contact message"""
        updated_data = {
            'name': 'Updated Jane Smith',
            'email': 'jane.smith.updated@example.com',
            'phone': '+1-555-111-2222',
            'subject': 'Updated Subject',
            'message': 'Updated message content here.',
            'is_read': True
        }
        
        url = reverse('contact-message-detail', kwargs={'pk': self.contact_message.pk})
        response = self.client.put(url, updated_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Updated Jane Smith')
        self.assertEqual(response.data['is_read'], True)

    def test_partial_update_contact_message(self):
        """Test PATCH /api/contact-messages/<id>/ - Partial update a contact message"""
        partial_data = {
            'is_read': True
        }
        
        url = reverse('contact-message-detail', kwargs={'pk': self.contact_message.pk})
        response = self.client.patch(url, partial_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['is_read'], True)
        # Original name should remain unchanged
        self.assertEqual(response.data['name'], 'Jane Smith')

    def test_delete_contact_message(self):
        """Test DELETE /api/contact-messages/<id>/ - Delete a contact message"""
        url = reverse('contact-message-detail', kwargs={'pk': self.contact_message.pk})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_delete_nonexistent_contact_message(self):
        """Test DELETE /api/contact-messages/<id>/ - Delete non-existent contact message"""
        url = reverse('contact-message-detail', kwargs={'pk': 99999})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_contact_message_empty_name(self):
        """Test creating contact message with empty name should fail"""
        invalid_data = {
            'name': '',
            'email': 'test@example.com',
            'subject': 'Test Subject',
            'message': 'Test message content'
        }
        
        url = reverse('contact-message-list')
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_contact_message_invalid_email(self):
        """Test creating contact message with invalid email should fail"""
        invalid_data = {
            'name': 'Test User',
            'email': 'invalid-email-format',
            'subject': 'Test Subject',
            'message': 'Test message content'
        }
        
        url = reverse('contact-message-list')
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_email_normalization(self):
        """Test that email is normalized to lowercase"""
        data_with_uppercase_email = {
            'name': 'Test User',
            'email': 'TEST.USER@EXAMPLE.COM',
            'subject': 'Test Subject',
            'message': 'Test message content'
        }
        
        url = reverse('contact-message-list')
        response = self.client.post(url, data_with_uppercase_email, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], 'test.user@example.com')

    def test_contact_message_default_values(self):
        """Test creating contact message with default values"""
        minimal_data = {
            'name': 'Minimal User',
            'email': 'minimal@example.com',
            'subject': 'Minimal Subject',
            'message': 'Minimal message content'
        }
        
        url = reverse('contact-message-list')
        response = self.client.post(url, minimal_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['is_read'], False)  # Default value