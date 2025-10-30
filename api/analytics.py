from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Q
from django.utils import timezone
from datetime import datetime, timedelta
from event.models import Event, Department
from department.models import dEvent


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_stats(request):
    """Get comprehensive event statistics"""
    
    # Get total counts
    total_events = Event.objects.count() + dEvent.objects.count()
    
    # Get upcoming and past events
    now = timezone.now().date()
    upcoming_events = Event.objects.filter(event_start_date__gte=now).count() + \
                     dEvent.objects.filter(event_start_date__gte=now).count()
    past_events = Event.objects.filter(event_end_date__lt=now).count() + \
                 dEvent.objects.filter(event_end_date__lt=now).count()
    
    # Events by department
    events_by_dept = []
    departments = Department.objects.all()
    for dept in departments:
        dept_event_count = Event.objects.filter(department_name=dept).count() + \
                          dEvent.objects.filter(department_name=dept).count()
        if dept_event_count > 0:
            events_by_dept.append({
                'department': dept.department_name,
                'count': dept_event_count
            })
    
    # Events by month (last 12 months)
    events_by_month = []
    for i in range(12):
        month_start = (timezone.now() - timedelta(days=30*i)).replace(day=1)
        month_end = (month_start + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        
        month_count = Event.objects.filter(
            event_start_date__gte=month_start,
            event_start_date__lte=month_end
        ).count() + dEvent.objects.filter(
            event_start_date__gte=month_start,
            event_start_date__lte=month_end
        ).count()
        
        events_by_month.append({
            'month': month_start.strftime('%b %Y'),
            'count': month_count
        })
    
    events_by_month.reverse()
    
    return Response({
        'total_events': total_events,
        'upcoming_events': upcoming_events,
        'past_events': past_events,
        'total_participants': 0,  # Placeholder - implement based on your participant tracking
        'events_by_department': events_by_dept,
        'events_by_month': events_by_month
    })


@api_view(['GET'])
def get_event_analytics(request, event_id):
    """Get analytics for a specific event"""
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        try:
            event = dEvent.objects.get(id=event_id)
        except dEvent.DoesNotExist:
            return Response({'error': 'Event not found'}, status=404)
    
    # Placeholder analytics - customize based on your needs
    analytics = {
        'event_id': event_id,
        'event_name': event.event_name,
        'total_participants': 0,  # Implement based on your participant model
        'registration_rate': 0,
        'engagement_score': 0,
    }
    
    return Response(analytics)
