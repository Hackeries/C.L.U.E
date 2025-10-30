from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet,
    ClubViewSet,
    EventViewSet,
    FestViewSet,
    DepartmentEventViewSet,
    NoticeViewSet,
)
from .analytics import get_event_stats, get_event_analytics
from .gallery import get_event_gallery, upload_gallery_image, delete_gallery_image
from .reports import generate_event_report, get_event_reports

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'clubs', ClubViewSet)
router.register(r'events', EventViewSet)
router.register(r'fests', FestViewSet)
router.register(r'department-events', DepartmentEventViewSet)
router.register(r'notices', NoticeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # Analytics endpoints
    path('analytics/stats/', get_event_stats, name='event-stats'),
    path('analytics/event/<int:event_id>/', get_event_analytics, name='event-analytics'),
    
    # Gallery endpoints
    path('gallery/<int:event_id>/', get_event_gallery, name='event-gallery'),
    path('gallery/<int:event_id>/upload/', upload_gallery_image, name='upload-gallery-image'),
    path('gallery/image/<int:image_id>/', delete_gallery_image, name='delete-gallery-image'),
    
    # Report endpoints
    path('reports/generate/', generate_event_report, name='generate-report'),
    path('reports/', get_event_reports, name='event-reports'),
]
