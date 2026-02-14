from django.db import models
from django.db.models import Max

# Create your models here.

class Page(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(blank=True, help_text="Short description for page lists")
    content = models.TextField()
    address = models.CharField(max_length=255, blank=True, help_text="Address for contact page")
    phone = models.CharField(max_length=50, blank=True, help_text="Phone number for contact page")
    email = models.EmailField(blank=True, help_text="Email for contact page")
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.order == 0:
            last_order = Page.objects.aggregate(max_order=Max('order'))['max_order'] or 0
            self.order = last_order + 1
        super().save(*args, **kwargs)


class ClassSection(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    age_group = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    schedule = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class NewsPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    body = models.TextField()
    image = models.ImageField(upload_to="news/", blank=True, null=True)
    published_at = models.DateTimeField()
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-published_at"]


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.subject


class SocialLink(models.Model):
    platform = models.CharField(max_length=50)
    url = models.URLField()
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.platform


MEDIA_TYPE_CHOICES = [('photo', 'Photo'), ('video', 'Video')]

class MediaItem(models.Model):
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)
    title = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to="media/photos/", blank=True, null=True)
    video_url = models.URLField(blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or self.media_type
