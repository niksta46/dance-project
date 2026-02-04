from rest_framework import serializers
from .models import Page, ClassSection, NewsPost, ContactMessage, SocialLink, MediaItem


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'

    def validate_slug(self, value):
        return value.strip().lower()


class ClassSectionSerializer(serializers.ModelSerializer):
    def validate_name(self, value):
        return value.strip()
    
    def validate_description(self, value):
        return value.strip()

    class Meta:
        model = ClassSection
        fields = '__all__'


class NewsPostSerializer(serializers.ModelSerializer):
    def validate_title(self, value):
        return value.strip()
    
    def validate_slug(self, value):
        return value.strip().lower()
    
    def validate_body(self, value):
        return value.strip()

    class Meta:
        model = NewsPost
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    def validate_email(self, value):
        return value.lower().strip()

    class Meta:
        model = ContactMessage
        fields = '__all__'


class SocialLinkSerializer(serializers.ModelSerializer):
    def validate_url(self, value):
        if not (value.startswith('http://') or value.startswith('https://')):
            raise serializers.ValidationError("URL must start with http:// or https://")
        return value.strip()

    class Meta:
        model = SocialLink
        fields = '__all__'


class MediaItemSerializer(serializers.ModelSerializer):
    def validate(self, data):
        media_type = data.get('media_type')
        image = data.get('image')
        video_url = data.get('video_url')

        if media_type == 'photo' and not image:
            raise serializers.ValidationError("Image is required for photo media type.")
        
        if media_type == 'video' and not video_url:
            raise serializers.ValidationError("Video URL is required for video media type.")
        
        if media_type == 'photo' and video_url:
            raise serializers.ValidationError("Video URL should not be provided for photo media type.")
        
        if media_type == 'video' and image:
            raise serializers.ValidationError("Image should not be provided for video media type.")

        return data

    class Meta:
        model = MediaItem
        fields = '__all__'