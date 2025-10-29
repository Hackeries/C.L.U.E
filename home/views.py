from django.shortcuts import render
from datetime import date
import calendar
from django.utils.timezone import now
from django.shortcuts import render
from event.models import Event, Notice, Department, Club # Club Events Model
from department.models import dEvent
from datetime import date
import calendar
from django.urls import reverse


def home(request):
    events = Event.objects.filter(event_start_date__gte=now()).order_by('event_start_date')[:5]  # Fetch upcoming events
    d_events = dEvent.objects.filter(event_start_date__gte=now()).order_by('event_start_date')[:5]  # Fetch upcoming department events
    notices = Notice.objects.all().order_by('-date_posted')[:5]  # Fetch latest notices

    return render(request, 'index.html', {'events': events, 'd_events': d_events, 'notices': notices})
    # return render(request, 'index.html')  # Render the home page

def clubs(request):
    return render(request, 'club_event.html')  # Render the clubs page

def dept_page(request):
    return render(request,"dept_page.html")

def profile(request):
    return render(request, 'profile.html')

def dept(request):
    return render(request, 'dept_page.html')

def event_page(request):
    return render(request, 'event_page.html')

def club_event(request):
    return render(request, 'club_event.html')


from django.urls import reverse

def calendar_view(request):
    today = date.today()
    month = request.GET.get("month")
    year = request.GET.get("year")

    try:
        month = int(month) if month else today.month
        year = int(year) if year else today.year
    except ValueError:
        month, year = today.month, today.year  # Default to current month if invalid values

    prev_month = 12 if month == 1 else month - 1
    prev_year = year - 1 if month == 1 else year
    next_month = 1 if month == 12 else month + 1
    next_year = year + 1 if month == 12 else year

    # List of month names
    month_names = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    # Get the month name from the list
    month_name = month_names[month - 1]

    cal = calendar.Calendar()
    month_days = cal.monthdatescalendar(year, month)  # Generate calendar structure

    weeks = []
    for week in month_days:
        week_data = []
        for day in week:
            if day.month == month:  # Only include current month days
                events = Event.objects.filter(event_start_date=day).values("event_name", "id", "club_name")
                devents = dEvent.objects.filter(event_start_date=day).values("event_name", "id", "department_name")

                all_events = [{"name": e["event_name"], "type": "Club", "id": e["id"], "club_name": e["club_name"]} for e in events] + \
                             [{"name": d["event_name"], "type": "Department", "id": d["id"], "department_name": d["department_name"]} for d in devents]

                week_data.append({
                    "date": day,
                    "day": day.day,
                    "events": all_events
                })
            else:
                week_data.append({"date": day, "day": 0, "events": []})
        weeks.append(week_data)

    context = {
        "weeks": weeks,
        "month": month_name,  # Pass the month name instead of the month number
        "year": year,
        "today": today,
        "prev_month": prev_month,
        "prev_year": prev_year,
        "next_month": next_month,
        "next_year": next_year
    }

    return render(request, "calender.html", context)


def search(request):
    query = request.GET.get('q', '').strip()
    date_str = request.GET.get('date', '').strip()
    department = request.GET.get('department', '').strip()
    event_type = request.GET.get('type', '').strip()  # 'club' or 'department'

    club_events = Event.objects.all()
    dept_events = dEvent.objects.all()

    if query:
        club_events = club_events.filter(event_name__icontains=query)
        dept_events = dept_events.filter(event_name__icontains=query)

    if date_str:
        try:
            from datetime import datetime
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            club_events = club_events.filter(event_start_date__lte=date, event_end_date__gte=date)
            dept_events = dept_events.filter(event_start_date__lte=date, event_end_date__gte=date)
        except ValueError:
            pass

    if department:
        club_events = club_events.filter(department_name__department_name__iexact=department)
        dept_events = dept_events.filter(department_name__department_name__iexact=department)

    # Filter by type if requested
    if event_type == 'club':
        dept_events = dept_events.none()
    elif event_type == 'department':
        club_events = club_events.none()

    departments = Department.objects.all().order_by('department_name')
    context = {
        'query': query,
        'date': date_str,
        'department': department,
        'type': event_type,
        'club_events': club_events.order_by('-event_start_date'),
        'dept_events': dept_events.order_by('-event_start_date'),
        'departments': departments,
    }
    return render(request, 'search_results.html', context)


# def calendar_view(request):
#     today = date.today()
#     month = request.GET.get("month")
#     year = request.GET.get("year")

#     try:
#         month = int(month) if month else today.month
#         year = int(year) if year else today.year
#     except ValueError:
#         month, year = today.month, today.year  # Default to current month if invalid values

#     prev_month = 12 if month == 1 else month - 1
#     prev_year = year - 1 if month == 1 else year
#     next_month = 1 if month == 12 else month + 1
#     next_year = year + 1 if month == 12 else year

#     # List of month names
#     month_names = [
#         'January', 'February', 'March', 'April', 'May', 'June',
#         'July', 'August', 'September', 'October', 'November', 'December'
#     ]

#     # Get the month name from the list
#     month_name = month_names[month - 1]

#     cal = calendar.Calendar()
#     month_days = cal.monthdatescalendar(year, month)  # Generate calendar structure

#     weeks = []
#     for week in month_days:
#         week_data = []
#         for day in week:
#             if day.month == month:  # Only include current month days
#                 events = Event.objects.filter(event_start_date=day).values("event_name")
#                 devents = dEvent.objects.filter(event_start_date=day).values("event_name")

#                 all_events = [{"name": e["event_name"], "type": "Club"} for e in events] + \
#                              [{"name": d["event_name"], "type": "Department"} for d in devents]

#                 week_data.append({
#                     "date": day,
#                     "day": day.day,
#                     "events": all_events
#                 })
#             else:
#                 week_data.append({"date": day, "day": 0, "events": []})
#         weeks.append(week_data)

#     context = {
#         "weeks": weeks,
#         "month": month_name,  # Pass the month name instead of the month number
#         "year": year,
#         "today": today,
#         "prev_month": prev_month,
#         "prev_year": prev_year,
#         "next_month": next_month,
#         "next_year": next_year
#     }

#     return render(request, "calender.html", context)

