from rest_framework import viewsets, permissions
from event.models import Department, Club, Event, Notice
from department.models import Fest, dEvent
from .serializers import (
    DepartmentSerializer,
    ClubSerializer,
    EventSerializer,
    FestSerializer,
    DepartmentEventSerializer,
    NoticeSerializer,
)


class ReadOnlyUnlessStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True
        return bool(request.user and request.user.is_staff)


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all().order_by("department_name")
    serializer_class = DepartmentSerializer
    permission_classes = [ReadOnlyUnlessStaff]


class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all().order_by("club_name")
    serializer_class = ClubSerializer
    permission_classes = [ReadOnlyUnlessStaff]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("-event_start_date")
    serializer_class = EventSerializer
    permission_classes = [ReadOnlyUnlessStaff]


class FestViewSet(viewsets.ModelViewSet):
    queryset = Fest.objects.all().order_by("-event_start_date")
    serializer_class = FestSerializer
    permission_classes = [ReadOnlyUnlessStaff]


class DepartmentEventViewSet(viewsets.ModelViewSet):
    queryset = dEvent.objects.all().order_by("-event_start_date")
    serializer_class = DepartmentEventSerializer
    permission_classes = [ReadOnlyUnlessStaff]


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all().order_by("-date_posted")
    serializer_class = NoticeSerializer
    permission_classes = [ReadOnlyUnlessStaff]
