from typing import Any
from django.utils.timezone import now
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Department, Club, Event, Notice
from .serializers import (
    DepartmentSerializer,
    ClubSerializer,
    EventSerializer,
    NoticeSerializer,
)


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all().order_by("department_name")
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.AllowAny]


class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.select_related("department_name").all().order_by("club_name")
    serializer_class = ClubSerializer
    permission_classes = [permissions.AllowAny]


class EventViewSet(viewsets.ModelViewSet):
    queryset = (
        Event.objects.select_related("department_name", "club_name")
        .all()
        .order_by("-event_start_date", "event_name")
    )
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params

        # Search by query string in name or venue
        q = params.get("q")
        if q:
            qs = qs.filter(event_name__icontains=q) | qs.filter(event_venue__icontains=q)

        # Filter by department or club (by slug/primary key value)
        department = params.get("department")
        if department:
            qs = qs.filter(department_name__department_name=department)

        club = params.get("club")
        if club:
            qs = qs.filter(club_name__club_name=club)

        # Filter upcoming/past/today
        when = params.get("when")
        today = now().date()
        if when == "upcoming":
            qs = qs.filter(event_start_date__gte=today)
        elif when == "past":
            qs = qs.filter(event_end_date__lt=today)
        elif when == "today":
            qs = qs.filter(event_start_date__lte=today, event_end_date__gte=today)

        # Date range filters
        start = params.get("start")
        end = params.get("end")
        if start:
            qs = qs.filter(event_start_date__gte=start)
        if end:
            qs = qs.filter(event_end_date__lte=end)

        return qs

    @action(detail=False, methods=["get"], url_path="stats")
    def stats(self, request, *args: Any, **kwargs: Any):
        today = now().date()
        return Response(
            {
                "total": self.get_queryset().count(),
                "upcoming": self.get_queryset().filter(event_start_date__gte=today).count(),
                "today": self.get_queryset().filter(
                    event_start_date__lte=today, event_end_date__gte=today
                ).count(),
            }
        )


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.select_related("department_name", "club_name").all().order_by("-date_posted")
    serializer_class = NoticeSerializer
    permission_classes = [permissions.AllowAny]
