from django.contrib import admin

from .models import Page, ClassSection, NewsPost, MediaItem, ContactMessage, SocialLink

# Register your models here.

admin.site.register(Page)
admin.site.register(ClassSection)
admin.site.register(NewsPost)
admin.site.register(ContactMessage)
admin.site.register(MediaItem)
admin.site.register(SocialLink)
