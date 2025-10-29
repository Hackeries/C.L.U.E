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

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'clubs', ClubViewSet, basename='club')
router.register(r'events', EventViewSet, basename='event')
router.register(r'fests', FestViewSet, basename='fest')
router.register(r'department-events', DepartmentEventViewSet, basename='department-event')
router.register(r'notices', NoticeViewSet, basename='notice')

urlpatterns = [
    path('', include(router.urls)),
]
