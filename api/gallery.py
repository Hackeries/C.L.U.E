from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.conf import settings
import os
import json


@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_gallery(request, event_id):
    """Get all images for an event"""
    # This is a placeholder implementation
    # In production, you should have a Gallery model to track images
    
    gallery_path = f'event_gallery/{event_id}/'
    
    try:
        if settings.USE_S3:
            # If using S3/Supabase Storage, list files from bucket
            # Implementation depends on your storage backend
            images = []
        else:
            # Local storage
            full_path = os.path.join(settings.MEDIA_ROOT, gallery_path)
            if os.path.exists(full_path):
                images = [
                    {
                        'id': idx,
                        'event_id': event_id,
                        'image_url': f"{settings.MEDIA_URL}{gallery_path}{filename}",
                        'caption': '',
                        'uploaded_at': ''
                    }
                    for idx, filename in enumerate(os.listdir(full_path))
                    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
                ]
            else:
                images = []
        
        return Response({'images': images})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_gallery_image(request, event_id):
    """Upload images to event gallery"""
    files = request.FILES.getlist('images')
    
    if not files:
        return Response({'error': 'No files provided'}, status=400)
    
    uploaded = []
    gallery_path = f'event_gallery/{event_id}/'
    
    try:
        for file in files:
            # Save file
            file_path = f"{gallery_path}{file.name}"
            saved_path = default_storage.save(file_path, file)
            
            uploaded.append({
                'filename': file.name,
                'url': default_storage.url(saved_path)
            })
        
        return Response({
            'success': True,
            'uploaded': uploaded
        })
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_gallery_image(request, image_id):
    """Delete an image from gallery"""
    # Implementation depends on how you track images
    # This is a placeholder
    
    try:
        # Get image path from request or database
        image_path = request.data.get('image_path')
        
        if image_path and default_storage.exists(image_path):
            default_storage.delete(image_path)
            return Response({'success': True})
        else:
            return Response({'error': 'Image not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
