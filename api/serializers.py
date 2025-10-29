from rest_framework import serializers
from event.models import Department, Club, Event, Notice
from department.models import Fest, dEvent


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["department_name", "department_description", "department_poster"]


class ClubSerializer(serializers.ModelSerializer):
    department_name = serializers.SlugRelatedField(slug_field="department_name", queryset=Department.objects.all())

    class Meta:
        model = Club
        fields = ["club_name", "club_description", "club_poster", "department_name"]


class EventSerializer(serializers.ModelSerializer):
    department_name = serializers.SlugRelatedField(slug_field="department_name", queryset=Department.objects.all())
    club_name = serializers.SlugRelatedField(slug_field="club_name", queryset=Club.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Event
        fields = [
            "id",
            "event_name",
            "event_start_date",
            "event_end_date",
            "event_time",
            "event_venue",
            "registration_link",
            "event_poster",
            "department_name",
            "club_name",
        ]


class FestSerializer(serializers.ModelSerializer):
    department_name = serializers.SlugRelatedField(slug_field="department_name", queryset=Department.objects.all())

    class Meta:
        model = Fest
        fields = ["fest_name", "department_name", "event_start_date", "event_end_date", "fest_poster"]


class DepartmentEventSerializer(serializers.ModelSerializer):
    department_name = serializers.SlugRelatedField(slug_field="department_name", queryset=Department.objects.all())
    fest_name = serializers.SlugRelatedField(slug_field="fest_name", queryset=Fest.objects.all(), allow_null=True, required=False)

    class Meta:
        model = dEvent
        fields = [
            "id",
            "event_name",
            "event_start_date",
            "event_end_date",
            "event_time",
            "event_venue",
            "registration_link",
            "event_poster",
            "department_name",
            "fest_name",
        ]


class NoticeSerializer(serializers.ModelSerializer):
    club_name = serializers.SlugRelatedField(slug_field="club_name", queryset=Club.objects.all(), allow_null=True, required=False)
    department_name = serializers.SlugRelatedField(slug_field="department_name", queryset=Department.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Notice
        fields = ["id", "title", "description", "date_posted", "club_name", "department_name"]
