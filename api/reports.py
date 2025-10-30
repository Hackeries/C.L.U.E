from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse
from event.models import Event
from department.models import dEvent
import json


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_event_report(request):
    """Generate event report in PDF or Excel format"""
    event_id = request.data.get('event_id')
    report_format = request.data.get('format', 'pdf')
    
    if not event_id:
        return Response({'error': 'event_id is required'}, status=400)
    
    try:
        # Try to get event from either model
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            event = dEvent.objects.get(id=event_id)
    except dEvent.DoesNotExist:
        return Response({'error': 'Event not found'}, status=404)
    
    # Prepare event data
    event_data = {
        'event_name': event.event_name,
        'event_venue': event.event_venue,
        'event_start_date': str(event.event_start_date),
        'event_end_date': str(event.event_end_date),
        'event_time': event.event_time,
        'department': event.department_name.department_name if hasattr(event.department_name, 'department_name') else str(event.department_name),
    }
    
    if report_format == 'pdf':
        # Return event data as JSON for frontend PDF generation
        # The frontend will handle actual PDF creation using jsPDF
        return Response({
            'success': True,
            'event_data': event_data,
            'message': 'Event data ready for PDF generation'
        })
    
    elif report_format == 'excel':
        # Return event data as JSON for frontend Excel generation
        # The frontend will handle actual Excel creation using xlsx
        return Response({
            'success': True,
            'event_data': event_data,
            'message': 'Event data ready for Excel generation'
        })
    
    else:
        return Response({'error': 'Invalid format. Use "pdf" or "excel"'}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_reports(request):
    """Get list of generated reports"""
    event_id = request.GET.get('event_id')
    
    # Placeholder implementation
    # In production, you should have a Report model to track generated reports
    
    reports = []
    
    return Response({'reports': reports})
