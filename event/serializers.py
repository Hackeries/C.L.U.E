from rest_framework import serializers
from .models import Department, Club, Event, Notice


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["department_name", "department_description", "department_poster"]


class ClubSerializer(serializers.ModelSerializer):
    department_name = serializers.SlugRelatedField(
        slug_field="department_name", queryset=Department.objects.all()
    )

    class Meta:
        model = Club
        fields = ["club_name", "department_name", "club_description", "club_poster"]


class EventSerializer(serializers.ModelSerializer):
    department_name = serializers.SlugRelatedField(
        slug_field="department_name", queryset=Department.objects.all()
    )
    club_name = serializers.SlugRelatedField(
        slug_field="club_name", queryset=Club.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = Event
        fields = [
            "id",
            "event_name",
            "event_start_date",
            "event_end_date",
            "event_time",
            "department_name",
            "club_name",
            "event_poster",
            "event_venue",
            "registration_link",
        ]


class NoticeSerializer(serializers.ModelSerializer):
    department_name = serializers.SlugRelatedField(
        slug_field="department_name", queryset=Department.objects.all(), allow_null=True, required=False
    )
    club_name = serializers.SlugRelatedField(
        slug_field="club_name", queryset=Club.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = Notice
        fields = ["id", "title", "description", "date_posted", "club_name", "department_name"]
