from rest_framework import views, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Page, ClassSection, NewsPost, ContactMessage, SocialLink, MediaItem, EventGallery
from .serializers import (
    PageSerializer, ClassSectionSerializer, NewsPostSerializer,
    ContactMessageSerializer, SocialLinkSerializer, MediaItemSerializer,
    EventGallerySerializer
)


class PageAPIView(views.APIView):
    def get(self, request):
        exclude_slugs = request.query_params.get('exclude_slugs', 'contact,socialmedia')
        if exclude_slugs.lower() == 'none':
            pages = Page.objects.all()
        else:
            slugs = [s.strip().lower() for s in exclude_slugs.split(',')]
            query = Q()
            for slug in slugs:
                query |= Q(slug__iexact=slug)
            pages = Page.objects.exclude(query)
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PageDetailAPIView(views.APIView):
    def get_object(self, pk):
        try:
            return Page.objects.get(pk=pk)
        except Page.DoesNotExist:
            return None

    def get(self, request, pk):
        page = self.get_object(pk)
        if page is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PageSerializer(page)
        return Response(serializer.data)

    def put(self, request, pk):
        page = self.get_object(pk)
        if page is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PageSerializer(page, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        page = self.get_object(pk)
        if page is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        page.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PageBySlugAPIView(views.APIView):
    def get(self, request, slug):
        try:
            page = Page.objects.get(slug__iexact=slug)
        except Page.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PageSerializer(page)
        return Response(serializer.data)


class ClassSectionAPIView(views.APIView):
    def get(self, request):
        sections = ClassSection.objects.all()
        serializer = ClassSectionSerializer(sections, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClassSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClassSectionDetailAPIView(views.APIView):
    def get_object(self, pk):
        try:
            return ClassSection.objects.get(pk=pk)
        except ClassSection.DoesNotExist:
            return None

    def get(self, request, pk):
        section = self.get_object(pk)
        if section is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ClassSectionSerializer(section)
        return Response(serializer.data)

    def put(self, request, pk):
        section = self.get_object(pk)
        if section is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ClassSectionSerializer(section, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        section = self.get_object(pk)
        if section is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClassSectionBySlugAPIView(views.APIView):
    def get(self, request, slug):
        try:
            section = ClassSection.objects.get(slug__iexact=slug)
        except ClassSection.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ClassSectionSerializer(section)
        return Response(serializer.data)


class NewsPostAPIView(views.APIView):
    def get(self, request):
        posts = NewsPost.objects.all()
        serializer = NewsPostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NewsPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NewsPostDetailAPIView(views.APIView):
    def get_object(self, pk):
        try:
            return NewsPost.objects.get(pk=pk)
        except NewsPost.DoesNotExist:
            return None

    def get(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = NewsPostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = NewsPostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        post = self.get_object(pk)
        if post is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NewsPostBySlugAPIView(views.APIView):
    def get(self, request, slug):
        try:
            post = NewsPost.objects.get(slug__iexact=slug)
        except NewsPost.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = NewsPostSerializer(post)
        return Response(serializer.data)


class ContactMessageAPIView(views.APIView):
    def get(self, request):
        messages = ContactMessage.objects.all()
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactMessageDetailAPIView(views.APIView):
    def get_object(self, pk):
        try:
            return ContactMessage.objects.get(pk=pk)
        except ContactMessage.DoesNotExist:
            return None

    def get(self, request, pk):
        message = self.get_object(pk)
        if message is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ContactMessageSerializer(message)
        return Response(serializer.data)

    def put(self, request, pk):
        message = self.get_object(pk)
        if message is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ContactMessageSerializer(message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        message = self.get_object(pk)
        if message is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SocialLinkAPIView(views.APIView):
    def get(self, request):
        links = SocialLink.objects.all()
        serializer = SocialLinkSerializer(links, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SocialLinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SocialLinkDetailAPIView(views.APIView):
    def get_object(self, pk):
        try:
            return SocialLink.objects.get(pk=pk)
        except SocialLink.DoesNotExist:
            return None

    def get(self, request, pk):
        link = self.get_object(pk)
        if link is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SocialLinkSerializer(link)
        return Response(serializer.data)

    def put(self, request, pk):
        link = self.get_object(pk)
        if link is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = SocialLinkSerializer(link, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        link = self.get_object(pk)
        if link is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        link.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MediaItemAPIView(views.APIView):
    def get(self, request):
        items = MediaItem.objects.all()
        serializer = MediaItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MediaItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MediaItemDetailAPIView(views.APIView):
    def get_object(self, pk):
        try:
            return MediaItem.objects.get(pk=pk)
        except MediaItem.DoesNotExist:
            return None

    def get(self, request, pk):
        item = self.get_object(pk)
        if item is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MediaItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, pk):
        item = self.get_object(pk)
        if item is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MediaItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        item = self.get_object(pk)
        if item is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventGalleryAPIView(views.APIView):
    def get(self, request):
        galleries = EventGallery.objects.all()
        serializer = EventGallerySerializer(galleries, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventGallerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventGalleryDetailAPIView(views.APIView):
    def get_object(self, pk):
        try:
            return EventGallery.objects.get(pk=pk)
        except EventGallery.DoesNotExist:
            return None

    def get(self, request, pk):
        gallery = self.get_object(pk)
        if gallery is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EventGallerySerializer(gallery)
        return Response(serializer.data)

    def put(self, request, pk):
        gallery = self.get_object(pk)
        if gallery is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EventGallerySerializer(gallery, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        gallery = self.get_object(pk)
        if gallery is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        gallery.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventGalleryBySlugAPIView(views.APIView):
    def get(self, request, slug):
        try:
            gallery = EventGallery.objects.get(slug__iexact=slug)
        except EventGallery.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EventGallerySerializer(gallery)
        return Response(serializer.data)